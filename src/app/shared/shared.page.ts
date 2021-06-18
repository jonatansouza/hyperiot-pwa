import { UserInteractionsService } from './../user-interactions.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPage implements OnInit {
  constructor(
    public router: Router,
    public interaction: UserInteractionsService
  ) { }

  ngOnInit() {
  }

  async requestPermission() {
    const result = await this.interaction.presentOptionsOnActionSheet([{
      text: 'Solicitar acesso',
      handler: () => {
        this.submitPermission();
      }
    }]);
    console.log(result);
  }

  submitPermission() {
    this.interaction.presentToast('granted');
  }
}
