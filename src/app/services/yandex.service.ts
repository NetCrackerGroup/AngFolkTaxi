import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YandexService {

  constructor(private http : HttpClient) { }


  getParametr () {
    let url = `${environment.devUrl}/yandex/clientId`;

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
}
