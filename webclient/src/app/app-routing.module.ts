import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './component/start/start.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';

const appRoutes : Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
