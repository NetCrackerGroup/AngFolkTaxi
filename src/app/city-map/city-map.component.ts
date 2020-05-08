import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../services/routes.service';
import {IRoute} from '../entities/iroute';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {any} from 'codelyzer/util/function';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';

@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.css']
})
export class CityMapComponent implements OnInit {

  listRoutes: IRoute[] = null;

  constructor(private  routeService: RoutesService) { }

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

}
