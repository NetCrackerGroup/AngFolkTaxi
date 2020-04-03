import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGroup } from '../entities/igroup';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

  checkUserInGroup( groupId : number ) {

    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `${environment.devUrl}/group/useringroup`;

    const params: HttpParams = new HttpParams().set('group_id', groupId.toString());
    console.log(params);

    return this.http.post(url, params);
  }

  createGroup  (namegroup: string, linkgroup: string ) : Observable<any> {

    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `${environment.devUrl}/group/`;

    const params: HttpParams = new HttpParams().set('name', namegroup).set('link', linkgroup);
    console.log(params);
    return this.http.post(url, params);
  }

  getAllGroups() {
    const url = `${environment.devUrl}/group`;
    console.log(`Get request ${url}`);
    return this.http.get<IGroup[]>(url);
  }

  getUserGroups(mail: string) {
    const url = `${environment.devUrl}/users/groupsByEmail/${mail}`;

    return this.http.get<IGroup[]>(url);
  }

  act(groupId, action : string) {
    const url = `${environment.devUrl}/group/act`;

    const params: HttpParams = new HttpParams().set('groupId', groupId).set('essence', action);
    console.log(params);

    return this.http.post(url, params);
  }
  deleteUser(groupId:number,userId:number){
    const url = `${environment.devUrl}/group/deleteUser`;
    let params: HttpParams = new HttpParams().set('groupId', groupId.toString()).set('userId', userId.toString());
    return this.http.put(url,params);
    
  }
  checkUserIsModeratorGroup( groupId : number ) {

    const url = `${environment.devUrl}/group/userismoderator`;

    const params: HttpParams = new HttpParams().set('group_id', groupId.toString());
    console.log(params);

    return this.http.post(url, params);
  }


}
