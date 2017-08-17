import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { UserModule } from '../../modules/user/user.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [ NavbarService ] 
})
export class NavbarComponent {

  private user_model = new UserModule();

  constructor( private _navbarService:NavbarService ){
   
  }
  callRegisterUser(){
    this._navbarService.registerNewUser(this.user_model)
  }
  
}
