import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { User } from '../../modules/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [ NavbarService ] 
})
export class NavbarComponent implements OnInit {

  constructor( private _navbarService:NavbarService){}

  @Input() user: User;
  responseStatus:Object= [];
  loggedIn:boolean ;

  ngOnInit() {
    this.user = new User();
    this.user.username = "";
    this.user.email = "";
    this.user.password = "";
    this.loggedIn = false;
    
  }
  register()
  {
    console.log(this.user);
    this._navbarService.registerUser(this.user).subscribe(
     data => console.log(this.responseStatus = data),
     err => console.log(err),
     () => console.log('Request Completed')
    ); 
    this.loggedIn = true;
  }
  socialLoginsrouting(k){
    this._navbarService.socialLogins(k.target.value).subscribe(
     data => console.log("data :",this.responseStatus = data),
     err => console.log("err:",err),
     () => console.log('Request Completed')
    ); 
    this.loggedIn = true;
  }
  
}
