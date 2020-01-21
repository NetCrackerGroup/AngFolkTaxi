import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:1337';
  token;

  constructor(private http: HttpClient, private router: Router ) {  }


  login(username: string, password: string) {
    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
      Authorization: 'Basic ' + btoa(`client:password`),

      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = { headers };

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    console.log({username, password, grant_type: 'password'});
    this.http.post(this.url + '/oauth/token', body, options)
      .subscribe((resp: any) => {
        console.log(resp);
        this.router.navigate(['profile']);
        localStorage.setItem('auth_token', resp.access_token);

      });
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }
}
