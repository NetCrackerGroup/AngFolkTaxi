import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../services/routes.service';
import {IRoute} from '../entities/iroute';




@Component({
  selector: 'app-route-view',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  private listRoutes: IRoute[] = null;

  constructor(private routeService: RoutesService) {
    routeService.getListRoutes().subscribe(
      res => {
          this.listRoutes =  = res;
      },
      err => {
        alert("Не удалось загрузить маршруты!");
      }
    )
  }

  ngOnInit() {
  //  this.listRoutes = this.routeService.getListRoutes();
  }

}
