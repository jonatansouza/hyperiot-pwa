import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionsService {

  constructor(
    public alert: AlertController,
    public toast: ToastController
  ) { }

    async showAlert(header: string, message: string) {
      return new Promise(async resolve => {
        const alert = await this.alert.create({
          header,
          subHeader: 'Confirme a ação',
          message,
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
