import { UserService } from './user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Meus dados', url: '', icon: 'albums' },
    { title: 'Compartilhados', url: '/shared', icon: 'share' },
    { title: 'Sair', url: '/login', icon: 'log-out' },
  ];
  constructor(
    public router: Router,
    public userService: UserService
  ) {
    const user = localStorage.getItem('user');
    if(user) {
      this.userService.user = JSON.parse(user);
    }
  }

  nav(url) {
    this.router.navigate([url]);
  }
}
