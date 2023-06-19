import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, createAuthorizationHeader } from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  URL=BASE_URL;

  login(user: {}): Observable<any> {
    return this.httpClient.post(this.URL + '/users/login',
    { user });
  }

  register(user: {}): Observable<any> {
    return this.httpClient.post(this.URL + '/users/register',
    { user });
  }
}
