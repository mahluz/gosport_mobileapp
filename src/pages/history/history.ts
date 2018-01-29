import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  histories:any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public storage:Storage,
  	public http:HttpClient,
  	public auth:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

    this.storage.get('token').then(data=>{
    	let access = {
    		token:data,
    		user_id:this.auth.currentUser["id"]
    	}

    	this.http.post('http://localhost/gosport_server/api/history',access).subscribe(result=>{
    		console.log(result);
    		this.histories = result["order"];
    	});
    });

  }

  refresh(){
  	this.storage.get('token').then(data=>{
    	let access = {
    		token:data,
    		user_id:this.auth.currentUser["id"]
    	}

    	this.http.post('http://localhost/gosport_server/api/history',access).subscribe(result=>{
    		console.log(result);
    		this.histories = result["order"];
    	});
    });
  }

}
