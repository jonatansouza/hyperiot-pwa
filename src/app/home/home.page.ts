import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  devices = [
    {
      id: 1,
      sharedDataDescription: 'My Device description 1',
      sharedWith: 'foo, bar',
      timestamp: new Date().getTime()
    },
    {
      id: 2,
      sharedDataDescription: 'My Device description 2',
      sharedWith: 'foo, bar',
      timestamp: new Date().getTime()
    },
    {
      id: 3,
      sharedDataDescription: 'My Device description 3',
      sharedWith: 'foo, bar',
      timestamp: new Date().getTime()
    }
  ];
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  detail({id}) {
    this.router.navigate(['devices/', id]);
  }
  create() {
    this.router.navigate(['create-device']);
  }

}
