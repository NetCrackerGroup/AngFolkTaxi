import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {HttpClientService} from './services/http-client.service';
import {TempSetrService} from './tempServices/temp-setr.service';
import {RouterOutlet} from '@angular/router';
import {async} from '@angular/core/testing';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'AngFolkTaxi';
  authService: AuthService;
  url = 'http://localhost:1337';

  @ViewChild(ModalPopupComponent, {static: false})
  private modalPopupComponent: ModalPopupComponent;
  private httpCli: HttpClientService;
  private tempSetrService: TempSetrService;
  private http: HttpClient;

  constructor(authService: AuthService, httpCli: HttpClientService, tempSetrService: TempSetrService, http: HttpClient) {
    this.authService = authService;
    this.httpCli = httpCli;
    this.tempSetrService = tempSetrService;
    this.http = http;
  }

  getUs() {
    this.httpCli.authGet(`${this.url}/users/helloUser`).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getAdmin() {
    const a =  this.httpCli.authGet(`${this.url}/users/Admin`).subscribe((resp: any) => {
      console.log(resp);
    });
    console.log(a);
  }

  getUser() {
    this.httpCli.authGet(`${this.url}/users/User`).subscribe((resp: any) => {
      console.log(resp);
    });
  }
  ngOnInit(): void {

  }


  Refresh() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`spring-security-oauth2-read-client:spring-security-oauth2-read-client-password1234`),
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('refresh_token', `${localStorage.getItem('refresh_token')}`)
      .set('grant_type', 'refresh_token');
    const options = { headers };
    console.log('Refresh');
    this.http.post(`${this.url}/oauth/token`, body, options).subscribe((res) => {
      console.log('Refresh end');
      console.log(res);
    });
  }
}
