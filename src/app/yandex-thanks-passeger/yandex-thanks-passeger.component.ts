import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../services/journey.service';
import {Router, ActivatedRoute} from '@angular/router';
import { authYandex } from '../yandex-money/yandex-money.component';
import { YandexService } from '../services/yandex.service';

export interface PassegerJourneyDTO {
  price : number,
  routeId : number,
  date : Date
}

@Component({
  selector: 'app-yandex-thanks-passeger',
  templateUrl: './yandex-thanks-passeger.component.html',
  styleUrls: ['./yandex-thanks-passeger.component.css']
})
export class YandexThanksPassegerComponent implements OnInit {

  passegerJourneyDTO : PassegerJourneyDTO;
  authParametrs : authYandex;
  completedFunction : boolean;

  private userID : number;
  private journeyID : number;

  constructor(    
    private activateRoute: ActivatedRoute,
    private router: Router,
    private journeyService: JourneyService,
    private yandexService : YandexService) { }

  ngOnInit(): void {
    this.handleQueryParams();
  }

  handleQueryParams() {
    this.activateRoute.queryParams.subscribe(
      res => {
        this.userID = res["userId"];
        this.journeyID = res["journeyId"];
        this.checkPaidJourney(this.userID, this.journeyID);
        console.log(res);
      }, 
      err => {
        console.log(err);
      }
    )
  }

  checkPaidJourney(userId : number, journeyID : number) {
    this.journeyService.checkPaidJourney(journeyID, userId).subscribe(
      res => {
        if ( res["status"] == "success" )
          this.completedFunction = true;
        if (res["status"] == "failure")
          this.infoJourney(journeyID);
      },
      err => {
        console.log(err);
      }      
    );
  }

  infoJourney(journeyId : number) {
    this.journeyService.getInfoJourner(journeyId).subscribe(
      res => {
        this.passegerJourneyDTO = res;
        this.authYandex();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  authYandex() {
    this.yandexService.getParametr("passenger").subscribe(
      (res) => {
        console.log(res["clientId"]);
        this.authParametrs = {
          clientId : res["clientId"] ,
          scope : res["scope"],
          redirect : `${res["redirect"]}?userID=${this.userID}&journeyID=${this.journeyID}`
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit(event) {
    event.preventdefault();
    console.log(event);
  }

  show() {
    console.log(this.passegerJourneyDTO);
  }

}