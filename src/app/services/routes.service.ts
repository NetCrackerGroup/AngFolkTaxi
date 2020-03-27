import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRoute} from '../entities/iroute';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private urlForRoutes = `${environment.devUrl}`;

  private listRoutes: Observable<IRoute[]> = null;
  private listDrivers: Observable<String[]> = null;

  constructor(private http: HttpClient) { }

  getDriverRoutes(): Observable<IRoute[]> {
    console.log('getDriverRoutes()');
    return this.http.get<IRoute[]>(`${this.urlForRoutes}/users/routes`);
  }

  getClosestRoutes(startPoint: string, endPoint: string, stRadius: number, enRadius: number, departure: string): void {
    this.listRoutes = this.http.get<IRoute[]>(`${this.urlForRoutes}/routes/closestRoutes/
      ${startPoint}/${endPoint}/${stRadius}/${enRadius}/${departure}`);

    //  this.startPoint[0] = parseInt(startPoint.split(",")[0], 10);
    //  this.startPoint[1] = parseInt(startPoint.split(",")[1], 10);
  }


/*
  setListRoutes(newListRoutes: IRoute[]): void {
    this.listRoutes = newListRoutes;
  } */

  getListRoutes(): Observable<IRoute[]> {
    return this.listRoutes;
  }
}
