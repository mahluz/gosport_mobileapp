import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpClient } from '@angular/common/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item={};
  request={};

  packet:any;
  place:any;
  currentUser:any;

  constructor(
    public navCtrl: NavController, 
    navParams: NavParams, 
    items: Items, 
    public auth:AuthServiceProvider,
    public http: HttpClient, 
    public storage:Storage,
    public alertCtrl: AlertController) {

    this.item = navParams.get('service') || items.defaultItem;
    
    this.request = {
      service:this.item['service'],
      name:this.auth.currentUser["name"]
    }

    console.log("item yang diterima",this.item);

    this.storage.get('token').then((data)=>{
      let access = {
        token:data,
        service_id:this.item["item"]
      }
      this.http.post('http://localhost/gosport_server/api/getForm',access).subscribe(data=>{
        console.log("form",data["result"]);
        this.packet = data["result"]["packet"];
        this.place = data["result"]["place"];
      },error=>{

      });
    });

    this.currentUser=this.auth.currentUser;


  }

  sendRequest(){
  	console.log(this.request);
    this.storage.get('token').then(data=>{
      let access = {
        token:data,
        request:this.request,
        user:this.currentUser
      };
      this.http.post('http://localhost/gosport_server/api/request',access).subscribe(result=>{
        console.log(result);
        console.log('seharusnya berhasil');
        this.showAlert('Success','Your request has been sent, please stay forward to get response in your Order menu');
        this.navCtrl.push('ListMasterPage');
      },error=>{
        console.log("gagal",error);
        this.showAlert('Gagal','Tolong lengkapi data diri anda');
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
