import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {HttpClientService} from './services/http-client.service';
import {TempSetrService} from './tempServices/temp-setr.service';
import {RouterOutlet} from '@angular/router';
import {async} from '@angular/core/testing';


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

  constructor(authService: AuthService, httpCli: HttpClientService, tempSetrService: TempSetrService) {
    this.authService = authService;
    this.httpCli = httpCli;
    this.tempSetrService = tempSetrService;
  }

  getUs() {
    this.httpCli.authGet(`${this.url}/users/helloUser`).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getAdmin() {
    const a = this.httpCli.authGet(`${this.url}/users/Admin`).subscribe((resp: any) => {
      console.log('qweqewqwe');
      console.log(resp);
    });
  }

  getUser() {
    this.httpCli.authGet(`${this.url}/users/User`).subscribe((resp: any) => {
      console.log(resp);
    });
  }
  ngOnInit(): void {

  }




}
