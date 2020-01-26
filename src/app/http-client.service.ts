import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {

  }

  get(url) {

    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
      Authorization: 'Basic ' + btoa(`client:password`)
    });
    return this.http.get(url, {
      headers
    });
  }

  post(url, data) {
    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
      Authorization: 'Basic ' + btoa(`client:password`)
    });
    return this.http.post(url, data, {
      headers
    });
  }
  authGet(url) {
    const headers = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('auth_token')
    });

    return this.http.get(url, {
      headers
    });
  }
}
