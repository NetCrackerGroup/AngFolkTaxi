import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IComplain} from '../entities/icomplain';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  private SEND_COMPLAIN_URL = `${environment.devUrl}/Complains/sendComplain/`;
  private GET_COMPLAINS_URL = `${environment.devUrl}/Complains/getComplains/`;

  constructor(private http: HttpClient) { }

  postComplain(adresatId: number, complain: IComplain): Observable<any>{

    let newparams:HttpParams = new HttpParams().set('text', complain.text.toString());
    return this.http.post<IComplain>(this.SEND_COMPLAIN_URL + adresatId, newparams);
  }

  getComplainsByUser(userId:number):Observable<IComplain[]>{
    return this.http.get<IComplain[]>(this.GET_COMPLAINS_URL + userId);
  }
}
