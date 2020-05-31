import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IJourney } from '../entities/ijourney';
import { Observable } from 'rxjs';
import { PassegerJourneyDTO } from '../yandex-thanks-passeger/yandex-thanks-passeger.component';

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

  getInfoJourner(journeyId : number) : Observable<PassegerJourneyDTO>{
    const url = `${environment.devUrl}/journeys/passeger/info?journeyId=${journeyId}`;

    return this.http.get<PassegerJourneyDTO>(url);
  }

  checkPaidJourney(journeyId : number, userId : number) {
    const url = `${environment.devUrl}/journeys/thank?journeyId=${journeyId}&userId=${userId}`;

    return this.http.get(url);
  }
}
