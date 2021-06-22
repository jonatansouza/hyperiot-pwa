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
      switchMap(id => this.service.getDeviceById(id))
    ).subscribe(device => {
      this.device = {
        ...device,
        sharedWithArr: DeviceHelper.toArr(device?.sharedWith)
      };
    });
  }

  ionViewWillLeave(){

  }

  async revoke(user) {
    const confirm = await this.interaction.showAlert('Revogar acesso!', 'Tem certeza que deseja revogar acesso de xpto?');
    if(confirm) {
      this.interaction.presentToast('Acesso revogado!');
    }
  }

  async grant() {
    const email = await this.interaction.presentAlertPrompt() as string;
    if(!email) {
      this.interaction.presentToast('Email inválido!', 'danger');
      return;
    }
    this.service.grantAccess(email);
    this.interaction.presentToast('Acesso garantido!');
  }

  async delete() {
    const confirm = await this.interaction.showAlert('Excluir dispositivo!', 'Tem certeza que deseja remover este Dispositivo?');
    if(confirm) {
      this.interaction.presentToast('Deletado!');
    }
  }
  history() {
    const id = 2;
    this.router.navigate(['history', id]);
  }
}
