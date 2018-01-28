import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  services:any;

  constructor(
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public auth:AuthServiceProvider,
    public storage:Storage,
    public http:HttpClient) {
    // this.currentItems = this.items.query();
    // console.log("problem",this.problems);
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.storage.get('token').then((data)=>{
      let access = {token:data};
      this.http.post('http://localhost/gosport_server/api/services',access).subscribe(data=>{
        console.log("post",data);
        this.services=data["result"];
      });

    });
    
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item,service) {
    this.navCtrl.push('ItemDetailPage', {
      service: {item:item,service:service}
    });
  }
}
