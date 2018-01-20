import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The registerCredentials fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  loading:Loading;
  
  registerCredentials: { email: string, password: string } = {
    email: 'asegaf@ymail.com',
    password: 'zulhamganteng'
  };

  // registerCredentials = {email:'',password:''};

  // Our translated text strings
  // private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private auth:AuthServiceProvider,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController
    ) {

  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'please wait...',
      dismissOnPageChange:true
    });

    this.loading.present();
  }

  showError(text){
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title:'Fail',
      subTitle:text,
      buttons:['OK']
    });

    alert.present();
  }

  // Attempt to login in through our User service
  doLogin() {

    this.showLoading();

    // this.user.login(this.registerCredentials).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });

    this.auth.login(this.registerCredentials).subscribe(allowed=>{
      if(allowed){
        this.navCtrl.push(MainPage);
      } else {
        this.showError('Access Denied');
      }
    });

  }
}
