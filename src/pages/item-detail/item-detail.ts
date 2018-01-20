import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  request={};

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public auth:AuthServiceProvider) {
    this.item = navParams.get('item') || items.defaultItem;
    console.log("item yang diterima",this.item);
  }

  sendRequest(){
  	// console.log(this.request);
  	this.auth.sendRequest(this.request);
  }

}
