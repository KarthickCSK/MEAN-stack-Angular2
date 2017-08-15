import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { StartComponent } from './component/start/start.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
