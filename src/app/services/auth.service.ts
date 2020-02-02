import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:1337';

  constructor(private http: HttpClient, private router: Router ) {  }


  login(username: string, password: string) {
    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
      // Authorization: 'Basic ' + btoa(`spring-security-oauth2-read-client:spring-security-oauth2-read-client-password1234`),
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
        localStorage.setItem('refresh_token', resp.refresh_token);
      }, error1 => {
        console.log(error1);
        const refrBody = {
          refresh_token: `${localStorage.getItem('refresh_token')}`,
          grant_type: 'refresh_token'
        };
        this.http.post(this.url + '/oauth/token', refrBody, options).subscribe((resp: any) => {
          localStorage.setItem('auth_token', resp.access_token);
          localStorage.setItem('refresh_token', resp.refresh_token);
        }, error => {this.router.navigate(['/']);
        });
      });
  }
}
