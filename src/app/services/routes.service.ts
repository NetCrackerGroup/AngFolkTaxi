import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRoute} from '../entities/iroute';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

/*
class TestRoute implements IRoute{
  price: number;
  routeBegin: number[];
  routeEnd: number[];
  routeId: number;

  constructor(price: number, routeBeg: number[]) {
    this.price = price;
    this.routeBegin = routeBeg;
  }
}
*/

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private urlForRoutes = `${environment.devUrl}`;

  private listRoutes: IRoute[] = null;
//
//  private testRoute1: IRoute = new TestRoute(120, [10.0, 2.2]);
//  private testRoute2: IRoute = new TestRoute(150, [12.0, 2.3]);
//
  constructor(private http: HttpClient) { }

  getDriverRoutes(mail: string): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(`${this.urlForRoutes}/users/routesByEmail/${mail}`);
  }

  getClosestRoutes(adress: string, radius: number, departure: string): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(`${this.urlForRoutes}/routes/closestRoutes/${adress}/${radius}/${departure}`);
  }

  setListRoutes(newListRoutes: IRoute[]): void {
    this.listRoutes = newListRoutes;
  }

  getListRoutes(): IRoute[] {
    //
    //this.listRoutes = [this.testRoute1, this.testRoute2];
    //
    return this.listRoutes;
  }
}
