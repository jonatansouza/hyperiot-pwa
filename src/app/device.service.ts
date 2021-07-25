import { DeviceModel } from './device.model';
import { DeviceHelper } from './device.helper';
import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DeviceService {
  loading = false;
  progress = '';
  constructor(private httpClient: HttpClient) {}

  getDevices() {
    const url = environment.api + 'assets';
    return this.httpClient.get<DeviceModel[]>(url).pipe(
      map((data) =>
        data
          .map((el) => ({
            ...el,
            cleanId: DeviceHelper.parseId(el?.id),
          }))
          .sort((a, b) => b.updated - a.updated)
      )
    );
  }

  deviceExists(id) {
    const url = environment.api + 'assets/' + id;
    return this.httpClient.head<any>(url);
  }

  getDeviceById(id) {
    const url = environment.api + 'assets/' + id;
    return this.httpClient.get<DeviceModel>(url).pipe(
      map((el) => ({
        ...el,
        cleanId: DeviceHelper.parseId(el?.id),
      }))
    );
  }

  createDevice(payload) {
    const url = environment.api + 'assets';
    return this.httpClient.post<DeviceModel>(url, payload);
  }

  grantAccess(id: string, thirdUser: string) {
    const url = environment.api + 'assets/' + id + '/grant-access';
    return this.httpClient.post<DeviceModel>(url, { thirdUser });
  }
  revokeAccess(id: string, thirdUser: string) {
    const url = environment.api + 'assets/' + id + '/revoke-access';
    return this.httpClient.post<DeviceModel>(url, { thirdUser });
  }
  getHistory(id: string) {
    const url = environment.api + 'assets/' + id + '/history';
    return this.httpClient.get<DeviceModel[]>(url).pipe(
      map((history) =>
        history.map((step) => ({
          ...step,
          mode: DeviceHelper.methodName(step.mode),
          cleanId: DeviceHelper.parseId(step?.id),
          sharedWithArr: DeviceHelper.toArr(step?.sharedWith),
        }))
      )
    );
  }

  sharedWithMe() {
    const url = environment.api + 'assets/shared-with-me';
    return this.httpClient.get<DeviceModel[]>(url).pipe(
      map((shared) =>
        shared.map((step) => ({
          ...step,
          mode: DeviceHelper.methodName(step.mode),
          cleanId: DeviceHelper.parseId(step?.id),
          sharedWithArr: DeviceHelper.toArr(step?.sharedWith),
        }))
      )
    );
  }

  requestPermission(id: string, ownerId: string) {
    this.loading = true;
    const url = environment.api + 'assets/' + id + '/request-permission';
    return this.httpClient
      .post(
        url,
        {ownerId},
        {
          responseType: 'arraybuffer',
          reportProgress: true,
          observe: 'events',
        }
      )
      .pipe(tap((res) => this.reportProgress(res)), catchError(e => {
        this.loading = false;
        return throwError(e);
      }));
  }
  downloadFile(data: any, filename: string) {
    const blob = new Blob([data.body], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  reportProgress(event) {
    if (event.type === HttpEventType.DownloadProgress) {
      this.progress = (event.loaded  / 1024 / 1024).toFixed(3);
      this.loading = true;
    }
    if (event.type === HttpEventType.Response) {
      this.loading = false;
    }
  }
}
