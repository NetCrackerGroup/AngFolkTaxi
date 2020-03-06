import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {RoutesService} from '../services/routes.service';
import {IGroup} from '../entities/igroup';
import {IRoute} from '../entities/iroute';

@Component({
  selector: 'app-find-root',
  templateUrl: './find-route.component.html',
  styleUrls: ['./find-route.component.css']
})
export class FindRouteComponent implements OnInit {

  private adress = '';
  private radius = 0;
  private depart = '';

  private listRoutes: IRoute[] = null;

  constructor(private  routeService: RoutesService) { }

  ngOnInit() {
  }

  submit() {
    if (this.adress.trim().length === 0) {
      alert('Заполните поле "Адрес" ');
    } else if (this.depart.trim().length === 0) {
      alert('Заполните поле "Время отправления" ');
    } else if (this.radius === 0) {
      alert('Заполните поле "Расстояние" ');
    } else {
      this.routeService.getClosestRoutes(this.adress, this.radius, this.depart);
    }
  }

}
