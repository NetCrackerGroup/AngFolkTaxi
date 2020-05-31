import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YandexService {

  constructor(private http : HttpClient) { }


  getParametr (type : string) {
    let url = `${environment.devUrl}/yandex/clientId?who=${type}`;

    return this.http.get(url);
  }

  authorize() {
    let url = `${environment.devUrl}/yandex/driver`;
 
    return this.http.get(url);
  }


  oauthAccessToken(code : string) {
    let url = `${environment.devUrl}/yandex/accessToken?code=${code}`;
    
    return this.http.get(url);
  }


  connectCash(code : string, routeId : number ) {
    let url = `${environment.devUrl}/yandex/connectCash?code=${code}&routeId=${routeId}`;

    return this.http.put(url, {});
  }

  payRouteChack(routeId : number) : Observable<any> {
    let url = `${environment.devUrl}/yandex/route/cash/${routeId}`;

    return this.http.get(url);
  }

  payRoute(routeId : number, code : string ) {
    let url = `${environment.devUrl}/yandex/pay/route/${routeId}?code=${code}`;

    let headers = new HttpHeaders();
    headers.set( "code" , code  );

    return this.http.post(url, {});
  }

  connectYandexPurse(code : string ) {
    let url = `${environment.devUrl}/yandex/purse?code=${code}`;

    return this.http.put(url, {});
  }

  thankForJourney(userID : number, journeyID : number, price : number, code : string) : Observable<any> {
    let url = `${environment.devUrl}/yandex/thank/driver`;

    let body = {userID : userID, journeyID : journeyID, price : price, code : code};

    return this.http.post(url, body);
  }


  checkValidPurse() : Observable<any> {
    let url = `${environment.devUrl}/yandex/check/connect/purse`

    return this.http.get(url);
  }

}