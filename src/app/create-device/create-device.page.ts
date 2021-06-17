import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.page.html',
  styleUrls: ['./create-device.page.scss'],
})
export class CreateDevicePage implements OnInit {
  description = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  id = new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit() {
  }

}