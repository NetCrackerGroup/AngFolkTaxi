import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(
    private http : HttpClient
    ) { }


  getUserId() : Observable<any> {
    let url = `${environment.devUrl}/users/whois`;

    return this.http.get(url);
  }
}
