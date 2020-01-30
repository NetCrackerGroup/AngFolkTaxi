import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGroup } from "../entities/igroup";
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http : HttpClient) { }

  addGroup( id : number ) {
    
    let url = `${environment.devUrl}/group/${id}`;
    console.log(url);

    return this.http.get<IGroup>(url);
  }

  craeteGroup (namegroup : String, linkgroup  : String ) {

    let headers = new Headers({'Content-Type': 'application/json'});
 
    let url = `${environment.devUrl}/group/`;


    let newparams : HttpParams = new HttpParams().set('name', namegroup).set('link', linkgroup);
//    const params = { name : namegroup, link : linkgroup};
    console.log(newparams);
    return this.http.post(url, newparams);
  }

  getAllGroups () {
    let url = `${environment.devUrl}/group`;

    return this.http.get<IGroup[]>(url);
  }
}