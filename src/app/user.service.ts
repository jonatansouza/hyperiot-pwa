import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user: {
    name: string;
    email: string;
  };
}
