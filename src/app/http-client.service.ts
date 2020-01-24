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
      Authorization: 'bearer 75581633-2998-469c-a12c-56128f08f326'
    });

    return this.http.get(url, {
      headers
    });
  }
}
