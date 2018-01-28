import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Settings } from '../../providers/providers';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
   biodata:any;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public auth:AuthServiceProvider,
    public http:HttpClient,
    public storage:Storage) {
  }
  ionViewDidLoad(){
    console.log(this.auth.currentUser);
    this.storage.get('token').then(data=>{
      let access = {
        token:data,
        user_id:this.auth.currentUser["id"]
      }
      this.http.post('http://localhost/gosport_server/api/getBiodata',access).subscribe(result=>{
        this.biodata = result;
        console.log(this.biodata);
      });
    });
  }

  logout(){
    this.auth.logout().subscribe(allowed=>{
      if(allowed){
        this.navCtrl.push('TutorialPage');
      } else {
        this.auth.showError("cant logout");
      }
    });
  }

  debug(){
    this.auth.debug();
  }

}
