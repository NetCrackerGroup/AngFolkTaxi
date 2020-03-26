import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICity } from '../entities/icity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CityService {

  constructor(private http: HttpClient) { }

    getCityById( cityId: number ) {

      const url = `${environment.devUrl}/city/${cityId}`;
      console.log(url);

      return this.http.get<ICity>(url);
    }


}
