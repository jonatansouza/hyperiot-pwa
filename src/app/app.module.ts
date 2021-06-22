import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { DeviceDetailPage } from './device-detail/device-detail.page';
import { CreateDevicePage } from './create-device/create-device.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { HistoryPage } from './history/history.page';
import { SharedPage } from './shared/shared.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, HomePage, DeviceDetailPage, CreateDevicePage, LoginPage, HistoryPage, SharedPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule ,ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
