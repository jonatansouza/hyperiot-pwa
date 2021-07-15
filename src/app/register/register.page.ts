import { UserService } from './../user.service';
import { UserInteractionsService } from './../user-interactions.service';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  constructor(public router: Router, public http: HttpClient, public utils: UserInteractionsService, public userService: UserService) {}
  register() {
    const name = this.name.value;
    const email = this.email.value;
    const password = this.password.value;
    this.http
      .post<any>(environment.api + 'login/register', { email, password, name })
      .subscribe(() => {
        this.router.navigate(['login']).finally(() => this.utils.presentToast('Seu usuário foi cadastrado com sucesso!'));
      }, err => {
        this.utils.presentToast('Erro ao criar usuario, tente mais tarde', 'danger');
        return;
      });
  }
}
