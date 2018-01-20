import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User{
	name:string;
	email:string;

	constructor(name:string,email:string){
		this.name=name;
		this.email=email;
	}
}

@Injectable()
export class AuthServiceProvider {

	currentUser:User;
	loading:Loading;

	constructor(public http: HttpClient, public storage:Storage, public alertCtrl:AlertController, loadingCtrl:LoadingController) {
		console.log('Hello AuthServiceProvider Provider');
	}

	public login(credentials){
		console.log(credentials);
		return Observable.create(observer=>{
			// let access = (credentials.password==='pass' && credentials.email==='email');
			this.http.post("http://localhost/megatrix_server/api/auth/login",credentials).subscribe(result=>{
				console.log(result);
				if(result['response'] == 'success'){
					this.storage.set('token',result['result']['token']);
					// this.storage.set('isLogin',true);
					observer.next(true);
					observer.complete();
				}
				observer.next(false);
				observer.complete();
				
			},error=>{
				console.log('gagal');
			});

		});
	}

	public getUserInfo(){

		this.storage.get('token').then((data)=>{
			let access = {token:data};

			this.http.post('http://localhost/megatrix_server/api/user',access).subscribe(data=>{
			  console.log(data);
			  this.storage.set('userInfo',data);
			  return data;
			});

		});
	}

	public logout(){
		this.storage.remove('token');
		return Observable.create(observer=>{
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}

	public showError(text){
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
		  title:'Fail',
		  subTitle:text,
		  buttons:['OK']
		});

		alert.present();
	}

	public debug(){
		this.storage.get('token').then(data=>{
			console.log(data);
			let access = {token:data};
			this.http.post('http://localhost/megatrix_server/api/problem',access).subscribe(problem=>{
				console.log(problem);
			});
			this.storage.get('userInfo').then((user)=>{
				console.log("data",user);
			});
		});
	}

	public sendRequest(request){
		// console.log(data);
		this.storage.get('token').then(data=>{
			let access = {
				token:data,
				request:request
			};
			this.http.post('http://localhost/megatrix_server/api/request',access).subscribe(result=>{
				console.log(result);
				console.log('seharusnya berhasil');
			},error=>{
				console.log("gagal");
			});
		});
	}

	public getProblem(){

		this.storage.get('token').then((data)=>{
			let access = {token:data};
			this.http.post('http://localhost/megatrix_server/api/problem',access).subscribe(data=>{
				this.storage.set('problem',data);
				console.log("post",data);
			});

		});
	}


}
