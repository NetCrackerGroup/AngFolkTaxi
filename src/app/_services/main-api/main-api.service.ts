import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Route} from '../../_models/model/route';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainApiService {
  private url = 'http://localhost:1337/route/byDriver/';

  constructor(private http: HttpClient) { }

  getDriverRoutes(id: number): Observable<Route[]> {
    return this.http.get<Route[]>('${this.url}${id}');
  }
}
