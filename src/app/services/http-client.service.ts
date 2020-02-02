import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {error} from 'util';
import {async} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) {

  }

  authPost(url, data, otherHeaders = {}): Observable< any >  {
    const headers = new HttpHeaders({
      // 'Access-Control-Request-Headers': '*',
      ...otherHeaders
    });
    let response: Response;
    this.http.post(url, data, {
      headers
    }).subscribe( (resp: any) => {
      response = resp;

      return resp;
    }, error => {
      this.refreshToken(url, headers);
      this.http.post(url, data, {
        headers
      }).subscribe( (resp2: any) => {
        response = resp2;
        return resp2;
      });
    });
  }

  public  authGet(url, otherHeaders = {}): Observable<any> {
    const headers = new HttpHeaders({
      ...otherHeaders,
      // Authorization: 'bearer ' + localStorage.getItem('auth_token')
    });
    this.http.get(url, {
      headers
    }).subscribe(resp => {
      return new Observable<any>(subscriber => {
        subscriber.next(resp);
      });
    });
    return new Observable<any>(subscriber => {
      subscriber.next('error');
    });
  }


  refreshToken(url, headers) {
    const refrBody = {
      refresh_token: `${localStorage.getItem('refresh_token')}`,
      grant_type: 'refresh_token'
    };
    this.http.post(url + '/oauth/token', refrBody, {headers}).subscribe((resp: any) => {
      localStorage.setItem('auth_token', resp.access_token);
      localStorage.setItem('refresh_token', resp.refresh_token);
    });
  }
}
