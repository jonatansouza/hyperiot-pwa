import { DeviceHelper } from './../device.helper';
import { DeviceModel } from './../device.model';
import { DeviceService } from './../device.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {
  history: DeviceModel[];
  id: string;
  constructor(
    public route: ActivatedRoute,
    public device: DeviceService
  ) { }

  ionViewWillEnter(){
    this.route.params
    .pipe(
      map(el => el.id),
      tap(id => this.id = id),
      switchMap((id: string) => this.device.getHistory(id))
    ).subscribe(history => {
      this.history = history;
    });
  }

  ionViewWillLeave(){

  }
  isOwner(step: DeviceModel) {
    return (step.ownerId === step.requester);
  }
  getStatus(permission: number) {
    return DeviceHelper.getPermissionStatus(permission);
  }
  getStatusColor(permission: number) {
    if(permission === 1) {
      return 'success';
    }
    if(permission === 2) {
      return 'danger';
    }
    return 'medium';
  }
}
