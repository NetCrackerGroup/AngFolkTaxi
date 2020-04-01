import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../services/routes.service';
import {IRoute} from '../entities/iroute';

@Component({
  selector: 'app-route-view',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  listRoutes: IRoute[] = null;
  startPoint: Number[];
  filt: number = 0;

  constructor(private routeService: RoutesService) {
    routeService.getListRoutes().subscribe(
      res => {
          this.listRoutes = res;

/*          this.startPoint = routeService.getStartPoint();


          for(let route of this.listRoutes){
            route.distance = this.getDistanceFromLatLonInKm(this.startPoint[0], this.startPoint[1], route.routeBegin[0], route.routeBegin[1]);
            route.distance = 200;
          } */
      },
      err => {
        alert("Не удалось загрузить маршруты!");
      }
    )
  }

  setFilter(filterNumber: number) {
    this.filt = filterNumber;
  }

  ngOnInit() {
  //  this.listRoutes = this.routeService.getListRoutes();
  }

  submit() {
  }

}
