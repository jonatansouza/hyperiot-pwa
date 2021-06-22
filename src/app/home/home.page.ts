import { DeviceHelper } from './../device.helper';
import { DeviceService } from './../device.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  devices = [
  ];
  constructor(
    public router: Router,
    public deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.deviceService.getDevices().subscribe((res: any) => {
      this.devices = res;
    });
  }

  detail({id}) {
    this.router.navigate(['devices/', DeviceHelper.parseId(id)]);
  }
  create() {
    this.router.navigate(['create-device']);
  }

}
