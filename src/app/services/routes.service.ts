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

  constructor(private http: HttpClient) { }

  getDriverRoutes(mail: string): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(`${this.urlForRoutes}/users/routesByEmail/${mail}`);
  }
}
