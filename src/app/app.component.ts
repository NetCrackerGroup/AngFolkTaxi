import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';
import {TempSetrService} from './tempServices/temp-setr.service';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import { AccViewComponent } from './acc-view/acc-view.component'


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

  @ViewChild(LoginComponent, {static: false})
  private loginComponent: LoginComponent;

  @ViewChild(AccViewComponent, {static: false})
  private accViewComponent : AccViewComponent;

  private tempSetrService: TempSetrService;
  private http: HttpClient;

  constructor(authService: AuthService,
              tempSetrService: TempSetrService, http: HttpClient,
              loginComponent: LoginComponent,
              accViewComponent: AccViewComponent) {
    this.loginComponent = loginComponent;
    this.accViewComponent = accViewComponent;
    this.authService = authService;
    this.tempSetrService = tempSetrService;
    this.http = http;
  }
/*
  getUs() {
    this.http.get(`${this.url}/users/helloUser`).subscribe((resp: any) => {
      console.log(resp);
    });
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
  }*/
  ngOnInit(): void {

  }
}
