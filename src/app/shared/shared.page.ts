import { DeviceModel } from './../device.model';
import { DeviceService } from './../device.service';
import { UserInteractionsService } from './../user-interactions.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPage implements OnInit {
  sharedList: DeviceModel[] = [];
  constructor(
    public router: Router,
    public interaction: UserInteractionsService,
    public device: DeviceService
  ) { }

  ngOnInit() {
    this.device.sharedWithMe().subscribe( sharedList => {
      this.sharedList = sharedList.sort((a, b) => b.updated - a.updated);
    });
  }

  async requestPermission(shared) {
    const result = await this.interaction.presentOptionsOnActionSheet([{
      text: 'Solicitar acesso',
      handler: () => {
        this.submitPermission(shared);
      }
    }]);
  }

  async submitPermission({id, ownerId, cleanId}) {
    try {
      const result = await this.device.requestPermission(id, ownerId).toPromise();
      this.device.downloadFile(result, cleanId);
      this.interaction.presentToast('Acesso permitido!');
    } catch(e) {
      console.log(e);
      this.interaction.presentToast('Acesso negado', 'danger');
    }
  }
}
