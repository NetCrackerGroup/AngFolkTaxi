import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IJourney } from '../entities/ijourney';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private http: HttpClient) { }

  getJourneyByIdForRate(JourneyID: number) {
    const url = `${environment.devUrl}/journeys/${JourneyID}`;
    console.log(`Get request on ${url}`);

    return this.http.get(url);
  }
}
