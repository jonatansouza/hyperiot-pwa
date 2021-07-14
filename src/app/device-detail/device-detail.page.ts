import { DeviceHelper } from './../device.helper';
import { DeviceModel } from './../device.model';
import { DeviceService } from './../device.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInteractionsService } from './../user-interactions.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage {
  device: DeviceModel;
  constructor(
    public interaction: UserInteractionsService,
    public router: Router,
    public route: ActivatedRoute,
    public service: DeviceService
  ) {}

  ionViewWillEnter(){
    this.route.params
    .pipe(
      map(el => el.id),
      switchMap(id => this.getDeviceById(id))
    ).subscribe(device => {
      this.device = device;
    });
  }

  ionViewWillLeave(){

  }

  getDeviceById(id) {
    return this.service.getDeviceById(id).pipe(map(device => ({
      ...device,
      sharedWithArr: DeviceHelper.toArr(device?.sharedWith)
    })));
  }

  async revoke(email) {
    const confirm = await this.interaction.showAlert('Revogar acesso!', 'Tem certeza que deseja revogar acesso de '+email + '?');
    if(!confirm) {
      return;
    }
    try {
      await this.service.revokeAccess(this.device.cleanId, email).toPromise();
      this.device = await this.getDeviceById(this.device.cleanId).toPromise();
      this.interaction.presentToast('Acesso revogado!');
    }
    catch(e) {
      this.interaction.presentToast('Erro de permissão!', 'danger');
    }
  }

  async grant() {
    const email = (await this.interaction.presentAlertPrompt() as string || '').trim().toLocaleLowerCase();
    if(!email || !DeviceHelper.isEmail(email)) {
      this.interaction.presentToast('Email inválido!', 'danger');
      return;
    }
    try {
      await this.service.grantAccess(this.device.cleanId, email).toPromise();
      this.device = await this.getDeviceById(this.device.cleanId).toPromise();
      this.interaction.presentToast('Acesso garantido!');
    }
    catch(e) {
      this.interaction.presentToast('Este usuário já possui acesso.', 'danger');
    }
  }

  async delete() {
    const confirm = await this.interaction.showAlert('Excluir dispositivo!', 'Tem certeza que deseja remover este Dispositivo?');
    if(confirm) {
      this.interaction.presentToast('Deletado!');
    }
  }
  history() {
    this.router.navigate(['history', this.device.cleanId]);
  }
}
