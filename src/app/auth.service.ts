import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:1337';
  token;

  constructor(private http: HttpClient, private router: Router ) {  }



  login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*' });
    const options = { headers };
    this.http.post(this.url + '/authenticate/login', {email, password}, options)
      .subscribe((resp: any) => {
        console.log(resp);
        this.router.navigate(['profile']);
        console.log(resp.token.tokenAsString);
        localStorage.setItem('auth_token', resp.token.tokenAsString);

      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    console.log(localStorage.getItem('auth_token'));
    return (localStorage.getItem('auth_token') !== null);
  }
}
