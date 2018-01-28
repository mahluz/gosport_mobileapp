import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
  	public auth:AuthServiceProvider) { 
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

}
