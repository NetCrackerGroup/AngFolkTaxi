import {Component, ViewChild} from '@angular/core';
import {AuthService} from './auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {HttpClientService} from './http-client.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngFolkTaxi';
  authService: AuthService;

  @ViewChild(ModalPopupComponent, {static: false})
  private modalPopupComponent: ModalPopupComponent;
  private httpCli: HttpClientService;

  constructor(authService: AuthService, httpCli: HttpClientService) {
    this.authService = authService;
    this.httpCli = httpCli;

  }

  getUs() {
    this.httpCli.authGet('http://localhost:1337/users/helloUser').subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
