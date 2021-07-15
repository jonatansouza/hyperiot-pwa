import { UserInteractionsService } from './../user-interactions.service';
import { DeviceService } from './../device.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.page.html',
  styleUrls: ['./create-device.page.scss'],
})
export class CreateDevicePage implements OnInit {
  description = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  bucket = new FormControl('', [Validators.required]);
  id = new FormControl('', [Validators.required]);
  idCheck;
  constructor(
    public deviceService: DeviceService,
    public interaction: UserInteractionsService
  ) { }

  ngOnInit() {
    this.id.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((typed: string) => this.deviceService.deviceExists((typed || '').trim()).pipe(catchError(err => of(true))))
    ).subscribe((res) => {
      if(!res) {
        this.idCheck = {
          message: 'Identificador indisponível',
          color: 'danger',
          valid: false,
        };
        return;
      }
      this.idCheck = {
        message: 'Identificador disponível',
        color: 'success',
        valid: true,
      };
    });
  }

  get disabled() {
    return !this.description.valid || !this.id.valid || !this.location.valid || !this.bucket.valid || !this.idCheck?.valid;
  }
  async save() {
    const payload = {
      sharedDataId: this.id.value,
      sharedDataDescription: this.description.value,
      bucket: this.bucket.value,
      resourceLocation: this.location.value
    };
    try {
      const result = await this.deviceService.createDevice(payload).toPromise();
      this.interaction.presentToast('Dispositivo criado com sucesso!');
    } catch(e) {
      this.interaction.presentToast(e?.error?.err?.msg || 'Erro ao criar', 'danger');
    }
  }
}
