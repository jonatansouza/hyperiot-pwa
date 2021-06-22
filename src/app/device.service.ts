import { DeviceModel } from './device.model';
import { DeviceHelper } from './device.helper';
import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  getDevices() {
    const url = environment.api + 'assets';
    return this.httpClient.get<DeviceModel[]>(url).pipe(
      map((data) =>
        data.map((el) => ({
          ...el,
          cleanId: DeviceHelper.parseId(el?.id),
        })).sort((a, b) => b.updated - a.updated)
      )
    );
  }

  deviceExists(id) {
    const url = environment.api + 'assets/' + id;
    return this.httpClient.head<any>(url);
  }

  getDeviceById(id) {
    const url = environment.api + 'assets/' + id;
    return this.httpClient.get<DeviceModel>(url).pipe(map(el => (
      {
        ...el,
        cleanId: DeviceHelper.parseId(el?.id)
      }
    )));
  }

  createDevice(payload) {
    const url = environment.api + 'assets';
    return this.httpClient.post<DeviceModel>(url, payload);
  }

  grantAccess(email: string) {
    const url = environment.api + 'assets';
    return this.httpClient.post<DeviceModel>(url, {email});
  }
}
