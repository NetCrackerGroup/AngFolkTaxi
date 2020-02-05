import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Route} from '../_models/model/route';
import {MainApiService} from '../_services/main-api/main-api.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routes: Route[] = [];

  constructor(private apiService: MainApiService) { }

  ngOnInit() {
  }

  public getDriverRoutes(id: number) {
    this.apiService.getDriverRoutes(id).subscribe(
      res => {
        this.routes = res;
      },
      err => {
        alert('Error');
      }
    );
  }

}
