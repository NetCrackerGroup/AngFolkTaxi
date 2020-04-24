import {Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";
import {BlockedErrorComponent} from "../blocked-error/blocked-error.component";

@Injectable({
  providedIn: 'root'


})
export class AuthService {

  url = environment.devUrl;

  result ;


  constructor(private http: HttpClient, private router: Router ) {  }


  login(username: string, password: string) {
    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
       Authorization: 'Basic ' + btoa(`spring-security-oauth2-read-client:spring-security-oauth2-read-client-password1234`),
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
        this.router.navigate(['']);
        localStorage.setItem('auth_token', resp.access_token);
        localStorage.setItem('refresh_token', resp.refresh_token);
        this.router.navigate(['start']);
      }, error1 => {
        console.log(error1);
        console.log(error1.error.error_description);
        if(error1.error.error_description=="User account is locked") {
          console.log("truer");
          this.router.navigate(['/blockederror'])
         // this.blockedErrorComponent.OpenPopup();
        }


      });
    console.log("Результатттт",this.result);
    //return this.result;


  }

  logout() {
    localStorage.clear();
  }
  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  refreshToken(): Observable<string> {
    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
      Authorization: 'Basic ' + btoa(`spring-security-oauth2-read-client:spring-security-oauth2-read-client-password1234`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('refresh_token', `${localStorage.getItem('refresh_token')}`)
      .set('grant_type', 'refresh_token');
    const options = { headers };
    console.log('attempting to refresh token');
    console.log(localStorage.getItem('refresh_token'));
    return this.http.post(`${this.url}/oauth/token`, body, options).pipe(
      tap((response: any) => {
        console.log('refresh token updated');
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }),
      catchError(error => Observable.throw(error.status))
    );
  }

}
