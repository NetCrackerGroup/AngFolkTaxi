import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../entities/iuser';

import { IUserAcc } from '../entities/iuseracc';

import { Observable } from 'rxjs';
import { IGroup } from '../entities/igroup';
import {IUser_moderator} from '../entities/iuser_moderator';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserGroups(){
    const url = `${environment.devUrl}/users/groups`;
    console.log(`Get request on ${url}`);

    return this.http.get<IGroup[]>(url);
  }

  getUserById(userId: number) {
    const url = `${environment.devUrl}/users/${userId}`;
    console.log(`Get request on ${url}`);

    return this.http.get<IUser>(url);
  }


  getUserByIdForAcc(userId: number) {
    const url = `${environment.devUrl}/users/user/${userId}`;
    console.log(`Get request on ${url}`);

    return this.http.get<IUserAcc>(url);
  }

  getUserImageForNav() {
    const url = `${environment.devUrl}/users/user/image`;
    console.log(`Get request on ${url}`);

    return this.http.get(url);
  }

  getUserForPro() {
    const url = `${environment.devUrl}/users/user/profile`;
    console.log(`Get request on ${url}`);

    return this.http.get<IUserAcc>(url);
  }

  updateUserFio(fio : string) {
    const body = new HttpParams()
      .set('fio', fio);
    const url = `${environment.devUrl}/users/update-user-fio`;
    console.log(`Update fio on ${url}`);
    this.http.post(url, body).subscribe();
    //this.fioSource.next(fio);
  }

  updateUserPassword(oldPassword: string,
                     currPassword : string) {
    const body = new HttpParams()
     .set('oldPassword',oldPassword)
     .set('currPassword', currPassword);
    const url = `${environment.devUrl}/users/update-user-password`;
    console.log(`Update password on ${url}`);
    this.http.post(url, body).subscribe();
  }

  updateUserEmail(email: string,
                  currPassword : string) {
    const body = new HttpParams()
     .set('email',email)
     .set('currPassword', currPassword);
    const url = `${environment.devUrl}/users/update-user-email`;
    console.log(`Update password on ${url}`);
    this.http.post(url, body).subscribe();
  }

  updateUserCity(city : string) {
    const body = new HttpParams()
      .set('city', city);
    const url = `${environment.devUrl}/users/update-user-city`;
    console.log(`Update city on ${url}`);
    this.http.post(url, body).subscribe();
  }

  updateUserPhoneNumber(phoneNumber : string) {
    const body = new HttpParams()
      .set('phoneNumber', phoneNumber);
    const url = `${environment.devUrl}/users/update-user-phone-number`;
    console.log(`Update phone number on ${url}`);
    this.http.post(url, body).subscribe();
  }

  updateUserInfo(info : string) {
    const body = new HttpParams()
      .set('info', info);
    const url = `${environment.devUrl}/users/update-user-info`;
    console.log(`Update info on ${url}`);
    this.http.post(url, body).subscribe();
  }

  updateUserImage(img : File) {
    const url = `${environment.devUrl}/users/update-user-image`;
    console.log(`Update info on ${url}`);
    const image: FormData = new FormData();
    image.append('file', img);
    this.http.post(url, image).subscribe();
  }

  rateDriver( driverId : number, rate : string){
    const body = new HttpParams()
      .set('userId', driverId.toString())
      .set('driverRating', rate);
    const url = `${environment.devUrl}/users/rate/driver-rating`;
    this.http.post(url, body).subscribe();
  }

  ratePassenger( passengerId : number, rate : string){
    const body = new HttpParams()
      .set('userId', passengerId.toString())
      .set('passengerRating', rate);
    const url = `${environment.devUrl}/users/rate/passenger-rating`;
    this.http.post(url, body).subscribe();
  }

  createNewReport( driverId : number, reportReason : string, reportText : string){
    const body = new HttpParams()
      .set('userId', driverId.toString())
      .set('reportReason', reportReason)
      .set('reportText', reportText);
    const url = `${environment.devUrl}/reports/create-report`;
    this.http.post(url, body).subscribe();
  }


  getGroups(administrator : boolean) : Observable<any>{

    let url = `${environment.devUrl}/users/`
    if ( administrator ) {
      return
    }

    else {

    }

  }

  getUserEmail() {
    const url = `${environment.devUrl}/users/getUserEmail`;
    console.log(`Email get request on ${url}`);

    return this.http.get<IUser>(url);
  }
  CheckUserIsAdmin() {
    const url = `${environment.devUrl}/users/isAdmin`;
    return this.http.get(url);
    
  }
  getAllUsers(){
    const url = `${environment.devUrl}/users/getAllUsers`;
    return this.http.get<IUser_moderator[]>(url);

  }

  getAllUserswithComplain(){
    const url = `${environment.devUrl}/users/getAllUsersWithComplains`;
    return this.http.get<IUser_moderator[]>(url);

  }
  complain(userId:number){
    const url = `${environment.devUrl}/users/complain`;
    const params: HttpParams = new HttpParams().set('userId', userId.toString());
    console.log(params);
    return this.http.post(url, params);
    
  }
  deleteUser(userId:number){
    const url = `${environment.devUrl}/users/deleteUser`;
    return this.http.delete(url,{
      params: new HttpParams().set(`userId`, userId.toString())
    });

  }

  isBan(userId:number){
    const url = `${environment.devUrl}/users/isban`;
    return this.http.get(url);

  }
  Ban(userId : number){
    const url = `${environment.devUrl}/users/ban`;
    const params: HttpParams = new HttpParams().set('userId', userId.toString());

    return this.http.put(url,params);


  }
  getLoggedUser(){
    const url = `${environment.devUrl}/users/getLogged`;
    return this.http.get(url);

  }
}

