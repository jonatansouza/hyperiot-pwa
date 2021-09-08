import { DeviceHelper } from './../device.helper';
import { DeviceService } from './../device.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  subs: Subscription[] = [];
  devices = [
  ];
  constructor(
    public router: Router,
    public deviceService: DeviceService,
  ) { }

  ionViewWillEnter(){
    this.subs.push(this.deviceService.getDevices().subscribe((res: any) => {
      this.devices = res.sort((a, b) => b.updated - a.updated);
    }));
  }

  detail({id}) {
    this.router.navigate(['devices/', DeviceHelper.parseId(id)]);
  }
  create() {
    this.router.navigate(['create-device']);
  }

  ionViewWillLeave(){
    while(this.subs.length) {
      const sub = this.subs.pop();
      sub.unsubscribe();
    }
  }

}
