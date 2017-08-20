import { Injectable } from '@angular/core';
import {HttpModule, Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { User } from '../modules/user/user'
@Injectable()
export class NavbarService {
    http: Http;  
    posts_Url: string = 'http://localhost:3000/user/addUSer';
    constructor(public _http: Http) {
       this.http = _http;
    }
    registerUser(user:User) {    
       return this.http.post(this.posts_Url, user, {  }).map(res =>  res.json());           
    }
    socialLoginsFb(url){
    	console.log(url);
    	return this.http.get('http://localhost:3000/auth/facebook');
    }
    socialLoginsGoogle(url){
    	console.log(url);
    	return this.http.get('http://localhost:3000/auth/google');
    }
}