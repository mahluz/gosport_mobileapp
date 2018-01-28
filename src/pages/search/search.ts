import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  requests:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public items: Items,
  	public http:HttpClient,
  	public storage:Storage,
  	public auth:AuthServiceProvider,
    public alertCtrl:AlertController) { 
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
        this.showAlert('Sucessfully','Thanks for using our Service');
        this.refresh();
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


}
