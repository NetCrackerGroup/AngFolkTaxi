import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRoute} from '../entities/iroute';
import {RoutesService} from '../services/routes.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routes: IRoute[] = [];

  constructor(private apiService: RoutesService) { }

  ngOnInit() {
  }

  /*public getDriverRoutes(id: number) {
    this.apiService.getDriverRoutes(id).subscribe(
      res => {
        this.routes = res;
      },
      err => {
        alert('Error');
      }
    );

  }
*/
}
