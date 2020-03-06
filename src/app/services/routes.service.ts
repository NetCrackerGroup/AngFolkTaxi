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

  constructor(private http: HttpClient) { }

  getDriverRoutes(mail: string): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(`${this.urlForRoutes}/users/routesByEmail/${mail}`);
  }

  getClosestRoutes(adress: string, radius: number, departure: string): void {
    this.listRoutes = this.http.get<IRoute[]>(`${this.urlForRoutes}/routes/closestRoutes/${adress}/${radius}/${departure}`);
  }

/*
  setListRoutes(newListRoutes: IRoute[]): void {
    this.listRoutes = newListRoutes;
  } */

  getListRoutes(): Observable<IRoute[]> {
    return this.listRoutes;
  }
}
