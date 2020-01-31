import {Component, ViewChild} from '@angular/core';
import {AuthService} from './auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {HttpClientService} from './http-client.service';
import {LoginComponent} from './login/login.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngFolkTaxi';
  authService: AuthService;
  url = 'http://localhost:1337';
  @ViewChild(ModalPopupComponent, {static: false})
  private modalPopupComponent: ModalPopupComponent;

  @ViewChild(LoginComponent, {static: false})
  private loginComponent: LoginComponent;
  private httpCli: HttpClientService;

  constructor(authService: AuthService, httpCli: HttpClientService) {
    this.authService = authService;
    this.httpCli = httpCli;
  }

  getUs() {
    this.httpCli.authGet(`${this.url}/users/helloUser`).subscribe((resp: any) => {
      console.log(resp.hello);
    });
  }

  getAdmin() {
    this.httpCli.authGet(`${this.url}/users/Admin`).subscribe((resp: any) => {
      console.log(resp.hello);
    });
  }

  getUser() {
      this.httpCli.authGet(`${this.url}/users/User`).subscribe((resp: any) => {
        console.log(resp.hello);
    });
  }


}
