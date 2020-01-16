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
        localStorage.setItem('auth_token', resp.token);

      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
