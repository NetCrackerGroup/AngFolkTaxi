import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {HttpClientService} from './services/http-client.service';
import {TempSetrService} from './tempServices/temp-setr.service';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginComponent} from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RouterOutlet]
})
export class AppComponent implements OnInit {

  constructor(authService: AuthService, httpCli: HttpClientService,
              tempSetrService: TempSetrService, http: HttpClient,
              loginComponent: LoginComponent) {
    this.loginComponent = loginComponent;
    this.authService = authService;
    this.httpCli = httpCli;
    this.tempSetrService = tempSetrService;
    this.http = http;
  }
  title = 'AngFolkTaxi';
  authService: AuthService;
  url = 'http://localhost:1337';


  private lat = 51.678418;
  private lng = 7.809007;

  @ViewChild(ModalPopupComponent)
   modalPopupComponent: ModalPopupComponent;

  @ViewChild(LoginComponent)
   loginComponent: LoginComponent;

  private httpCli: HttpClientService;
  private tempSetrService: TempSetrService;
  private http: HttpClient;


   getUs() {
    this.httpCli.authGet(`${this.url}/users/helloUser`).subscribe((resp: any) => {
      console.log(resp);
    });
    // const user = this.http.get(`${this.url}/users/helloUser`).toPromise();
  }

   getAdmin() {
    this.http.get(`${this.url}/users/Admin`).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getUser() {
    this.http.get(`${this.url}/users/User`).subscribe((resp: any) => {
      console.log(resp);
    });
  }
  ngOnInit(): void {

  }


}
