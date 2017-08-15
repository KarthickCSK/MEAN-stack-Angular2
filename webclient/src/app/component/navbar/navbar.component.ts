import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  complexForm : FormGroup;

  constructor(fb: FormBuilder){
    this.complexForm = fb.group(
    {
      'user_name': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      're-password' : [null, Validators.required]
    })
  }

  submitForm(value: any){
    console.log(value);
  }

}
