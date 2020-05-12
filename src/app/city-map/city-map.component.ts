import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../services/routes.service';
import {IRoute} from '../entities/iroute';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {any} from 'codelyzer/util/function';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';
import {AuthService} from '../services/auth.service';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.css']
})
export class CityMapComponent implements OnInit {

  listRoutes: IRoute[] = null;
  authService: AuthService;
  loginComponent: LoginComponent;

  constructor(private  routeService: RoutesService,
              authService: AuthService,
              loginComponent: LoginComponent) {
      this.authService = authService;
      this.loginComponent = loginComponent;
  }

  ngOnInit() {
    this.routeService.getRandomRoutes().subscribe(
        res => {
          console.log(res);
          this.listRoutes = res;
        },
        err => {
          alert(`Error , ${err}`);
          console.log(`Error , ${err}`);
        }
    );

  }

  isReg(): boolean {
    return this.authService.logIn;
  }
}
