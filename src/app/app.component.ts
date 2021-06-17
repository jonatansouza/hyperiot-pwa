import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user = {
    name: 'Jonatan Gall',
    email: 'jonatangd.souza@gmail.com'
  };
  public appPages = [
    { title: 'Meus dados', url: '', icon: 'albums' },
    { title: 'Compartilhados', url: '', icon: 'share' },
    { title: 'Sair', url: '/login', icon: 'log-out' },
  ];
  constructor(public router: Router) {}

  nav(url) {
    this.router.navigate([url]);
  }
}
