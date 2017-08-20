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
  status:boolean ;

  ngOnInit() {
    this.user = new User();
    this.user.username = "";
    this.user.email = "";
    this.user.password = "";
    
  }
  register()
  {
    console.log(this.user);
    this._navbarService.registerUser(this.user).subscribe(
     data => console.log(this.responseStatus = data),
     err => console.log(err),
     () => console.log('Request Completed')
    ); 
    this.status = true;
  }
  routing(k){
    console.log(k.target.value);
    if(k.target.value=='/auth/facebook'){
    this._navbarService.socialLoginsFb(k.target.value);
    }
    if(k.target.value=='/auth/google'){
    this._navbarService.socialLoginsGoogle(k.target.value);
    }
  }
  
}
