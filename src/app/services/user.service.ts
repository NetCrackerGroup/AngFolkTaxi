import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../entities/iuser';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(userId: number) {
    const url = `${environment.devUrl}/users/${userId}`;
    console.log(`Get request on ${url}`);

    return this.http.get<IUser>(url);
  }

  getGroups(administrator : boolean) : Observable<any>{

    let url = `${environment.devUrl}/users/`
    if ( administrator ) {
      return 
    }

    else {

    }

  }

}