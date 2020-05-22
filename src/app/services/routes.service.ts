import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getClosestRoutes(startPoint: string, endPoint: string, stRadius: number, enRadius: number,
    departure: Date, time: Date, groupId: number): void {
    //let formatted = '' + time.getHours() + ':' + time.getMinutes();
    this.listRoutes = this.http.get<IRoute[]>(`${this.urlForRoutes}/routes/closestRoutes/
      ${startPoint}/${endPoint}/${stRadius}/${enRadius}/${departure}/${time}/${groupId}`);

    //  this.startPoint[0] = parseInt(startPoint.split(",")[0], 10);
    //  this.startPoint[1] = parseInt(startPoint.split(",")[1], 10);
  }
  getRouteDriver(routeId) {
    return this.http.get(`${this.urlForRoutes}/routes/driver/${routeId}`,  {responseType: 'text'});
  }

/*
  setListRoutes(newListRoutes: IRoute[]): void {
    this.listRoutes = newListRoutes;
  } */

  getListRoutes(): Observable<IRoute[]> {
    return this.listRoutes;
  }

  deleteUser(routeId:number,userId:number){
    const url = `${environment.devUrl}/routes/deletePassenger`;
    let params: HttpParams = new HttpParams().set('routeId', routeId.toString()).set('userId', userId.toString());
    return this.http.put(url,params);

  }

  getRandomRoutes(){
    return this.http.get<IRoute[]>(`${this.urlForRoutes}/routes/randomRoutes`);
  }

  checkUserIsDriver( routeId : number ) {

    const url = `${environment.devUrl}/routes/userisdriverr`;

    const params: HttpParams = new HttpParams().set('routeId', routeId.toString());
    console.log(params);

    return this.http.post(url, params);
  }
  startRouter( routeId: number ) {

    const url = `${environment.devUrl}/routes/startJourney`;

    const params: HttpParams = new HttpParams().set('routeId', routeId.toString());

    return this.http.post(url, params);
  }

  endRouter( routeId: number ) {
    const url = `${environment.devUrl}/routes/endJourney`;
    const params: HttpParams = new HttpParams().set('routeId', routeId.toString());
    return this.http.post(url, params);
  }

  getAllMembers(routeId : number) : Observable<any>{
    let url = `${environment.devUrl}/routes/members?routeId=${routeId}`;

    console.log("Members");

    return this.http.get(url)
  }
}
