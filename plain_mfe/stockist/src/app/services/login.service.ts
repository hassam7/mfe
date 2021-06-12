import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public isUserLoggedIn = false;
  constructor(private httpClient: HttpClient) {}
  login(username: string, password: string) {
    this.isUserLoggedIn = true;
    return true;
  }
}
