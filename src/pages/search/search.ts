import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController, LoadingController, Loading,ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  requests:any;
  details:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public items: Items,
  	public http:HttpClient,
  	public storage:Storage,
  	public auth:AuthServiceProvider,
    public alertCtrl:AlertController,
    public actionSheetCtrl: ActionSheetController) { 
  	// this.user = "ulala";
  }

  /**
   * Perform a service for the proper items.
   */

  openMaterial(){
    this.navCtrl.push('MaterialPage');
  }

  ionViewDidLoad(){
  	console.log("user",this.auth.currentUser["id"]);

  	this.storage.get('token').then(data=>{
  		let access = {
  			token:data,
  			user_id:this.auth.currentUser["id"]
  		};

  		this.http.post('http://localhost/gosport_server/api/getRequest',access).subscribe(result=>{
  			this.requests = result["result"];
  			console.log('hasilnya',result["result"]);
  			console.log('requestnya',this.requests);
  		});
  	});

  }

  refresh(){
    this.storage.get('token').then(data=>{
      let access = {
        token:data,
        user_id:this.auth.currentUser["id"]
      };

      this.http.post('http://localhost/gosport_server/api/getRequest',access).subscribe(result=>{
        this.requests = result["result"];
        console.log('hasilnya',result["result"]);
        console.log('requestnya',this.requests);
      });
    });
  }

  cancelOrder(order_id){
    console.log(order_id);
    this.storage.get('token').then(data=>{
      let access = {token:data,order_id:order_id};
      this.http.post('http://localhost/gosport_server/api/cancelOrder',access).subscribe(result=>{
        this.showAlert('Attention','Your order has been canceled');
        this.refresh();
      });
    });
  }

  finishOrder(order_id){
    console.log(order_id);

    this.storage.get('token').then(data=>{
      let access = {token:data,order_id:order_id};
      this.http.post('http://localhost/gosport_server/api/finishOrder',access).subscribe(result=>{
        console.log(result);
        if(result["result"] == 1){
          this.showAlert('Sucessfully','Thanks for using our Service');
          this.refresh();
        } else {
          this.showAlert('Failed','Please wait our Technician or Call our Customer Service');
          this.refresh();
        }
      });
    });
  }

  showAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  detailOrder(order_id){

    this.storage.get('token').then(data=>{
      let access = {
        token:data,
        order_id:order_id
      };

      this.http.post('http://localhost/gosport_server/api/detailOrder',access).subscribe(data=>{

        this.details = data;
        console.log("order id",order_id);
        console.log(this.details);

        let actionSheet = this.actionSheetCtrl.create({
          title: 'Detail Order',
          buttons: [
            {
              text: 'Ditangani oleh : '+this.details["technician"]["name"],
              role: 'destructive',
              handler: () => {
                console.log('Destructive clicked');
              }
            },{
              text: 'Contact : '+this.details["technician"]["cp"],
              handler: () => {
                console.log('Archive clicked');
              }
            },{
              text: 'Aktifitas Terakhir : '+this.details["order"]["updated_at"],
              handler: () => {
                console.log('Archive clicked');
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();

      },error=>{
        console.log("error nih",error);
        this.showAlert("error","error to get Order Details");
      });

    });

  }

  history(){
    console.log('history');
    this.navCtrl.push('HistoryPage');
  }

}
