import { Injectable } from '@angular/core';
import {HttpModule, Http,Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { User } from '../modules/user/user'
@Injectable()
export class NavbarService {
    http: Http;  
    registerUserUrl: string = 'http://localhost:3000/user/addUSer';
    url: string = 'http://localhost:3000'
    constructor(public _http: Http) {
       this.http = _http;
    }
    registerUser(user:User) {    
       return this.http.post(this.registerUserUrl, user, {  }).map(res =>  res.json());           
    }
    socialLogins(route:String){
        console.log(route)
    	return this.http.get(this.url+route).map(res =>  res.json());
    }
}