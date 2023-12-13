import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule, iosTransitionAnimation } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,
    IonicModule.forRoot({animated:true,navAnimation:iosTransitionAnimation}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
