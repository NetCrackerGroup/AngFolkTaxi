import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGroup } from '../entities/igroup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroup( id: number ) {

    const url = `${environment.devUrl}/group/${id}`;
    console.log(url);

    return this.http.get(url);
  }

  createGroup(namegroup: string, linkgroup: string ) {

    const headers = new Headers({'Content-Type': 'application/json'});

    const url = `${environment.devUrl}/group/`;


    const newparams: HttpParams = new HttpParams().set('name', namegroup).set('link', linkgroup);
//    const params = { name : namegroup, link : linkgroup};
    console.log(newparams);
    return this.http.post<IGroup>(url, newparams);
  }

  getAllGroups() {
    const url = `${environment.devUrl}/group`;

    return this.http.get<IGroup[]>(url);
  }

  getUserGroups(mail: string) {
    const url = `${environment.devUrl}/users/groupsByEmail/${mail}`;

    return this.http.get<IGroup[]>(url);
  }
}
