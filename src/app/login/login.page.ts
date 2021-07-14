import { UserService } from './../user.service';
import { UserInteractionsService } from './../user-interactions.service';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  constructor(public router: Router, public http: HttpClient, public utils: UserInteractionsService, public userService: UserService) {}
  forgot() {}
  register() {}
  login() {
    const email = this.email.value;
    const password = this.password.value;
    this.http
      .post<{ token: string; user: any }>(environment.api + 'login', { email, password })
      .subscribe(({ token, user }) => {
        if (token) {
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('user', JSON.stringify((user)));
          this.userService.user = user;
          this.router.navigate(['']).finally(() => {
            this.utils.presentToast('Olá, ' + user?.name + '!');
          });
        }
      }, err => {
        if(err.status === 400) {
          this.utils.presentToast('Usuário inválido ou não encontrado!', 'danger');
          return;
        }
        this.utils.presentToast('Credenciais inválidas', 'danger');
      });
  }
}
