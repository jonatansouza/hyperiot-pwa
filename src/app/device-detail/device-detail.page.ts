import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  templateUrl: './device-detail.page.html',
  styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage {
  constructor(
    public alert: AlertController,
    public toast: ToastController
  ) {}

  async revoke(user) {
    const confirm = await this.showAlert('xpto');
    if(confirm) {
      this.presentToast('Acesso revogado!');
    }

  }

  async showAlert(user: string) {
    return new Promise(async resolve => {
      const alert = await this.alert.create({
        header: 'Revogar acesso',
        subHeader: 'Confirme a ação',
        message: 'Tem certeza que deseja revogar o acesso de ' + user,
        buttons: [{
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim'
        }]
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      resolve(!role);
    });
  }

  async presentToast(message, theme?) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      color: theme || 'success'
    });
    toast.present();
  }
  async grant() {
    const email = await this.presentAlertPrompt();
    if(!email) {
      this.presentToast('Email inválido!', 'danger');
      return;
    }
    this.presentToast('Acesso garantido!');
  }
  async presentAlertPrompt() {
    return new Promise(async resolve => {
      const alert = await this.alert.create({
        header: 'Digite o e-mail do usuário que deseja dar acesso:',
        inputs: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'usuario@exemplo.com',
            attributes: {
              minlength: 8,
              inputmode: 'email'
            }
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Ok',
            handler: ({email}) => {
              resolve(email);
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
