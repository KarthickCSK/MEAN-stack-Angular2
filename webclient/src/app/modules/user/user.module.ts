import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

export class UserModule {
    constructor(
      public user_name: string,
	  public email: string,
	  public password: string
        ){}
}