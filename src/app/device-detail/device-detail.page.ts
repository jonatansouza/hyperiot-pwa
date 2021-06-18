import { Router } from '@angular/router';
import { UserInteractionsService } from './../user-interactions.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage {
  constructor(
    public interaction: UserInteractionsService,
    public router: Router
  ) {}

  async revoke() {
    const confirm = await this.interaction.showAlert('Revogar acesso!', 'Tem certeza que deseja revogar acesso de xpto?');
    if(confirm) {
      this.interaction.presentToast('Acesso revogado!');
    }

  }

  async grant() {
    const email = await this.interaction.presentAlertPrompt();
    if(!email) {
      this.interaction.presentToast('Email inválido!', 'danger');
      return;
    }
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
