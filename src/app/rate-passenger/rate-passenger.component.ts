import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JourneyService } from '../services/journey.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { IJourney } from '../entities/ijourney';
import { UserService } from '../services/user.service';
import { IUserAcc } from '../entities/iuseracc';

import { ReportComponent } from '../report/report.component';
import { AccViewComponent } from '../acc-view/acc-view.component';

@Component({
  selector: 'app-rate-passenger',
  templateUrl: './rate-passenger.component.html',
  styleUrls: ['./rate-passenger.component.css']
})
export class RatePassengerComponent implements OnInit {

  @ViewChild(ReportComponent, {static: false})
  reportComponent: ReportComponent;

  @ViewChild(AccViewComponent, {static: false})
  accViewComponent: AccViewComponent;

  accView : boolean;

  journeyId : number = 0;
  rating : number = 0;
  id : number =  0;
  imageSwitch = true;
  fio : string = "";
  //image : string = "";
  /*user : IUserAcc = {
      fio : "",
      phoneNumber : "",
      cityName : "",
      passengerRating : "",
      driverRating : "",
      info : "",
      image : ""
    };*/

  private subscription: Subscription;

  constructor(private journeyService : JourneyService,
              private route: ActivatedRoute,
              private userService : UserService,
              config: NgbRatingConfig,
              private router : Router) {
     config.max = 5;
     config.readonly = false;
     this.accView = false;
     this.subscription = route.params.subscribe(params=>{
     userService.getUserByIdForAcc(params['passengerId']).subscribe(
       res => {
         //console.log(res["journeyId"]);
         this.id = params['passengerId'];
         this.journeyId = params['journeyId'];
         this.fio = res["fio"];
         /*if(res["image"] == null)
          this.imageSwitch = false;
         else
          this.image = 'data:image/jpeg;base64,' + res["image"];*/
          //this.user.image = 'data:image/jpeg;base64,' + res["image"];
         //console.log(this.journey.Id);
       },
       err => {
         //alert("Поездка не найдена!");
       });
      });
  }


  ngOnInit() {
  }

  Exit(){
    this.router.navigate(['/']);
  }

   RatePassenger() {
    console.log(this.rating);
    if (this.rating == null){
      alert("Заполните поле \"rating\" ");
    }
    else {
      this.userService.ratePassenger(this.id, this.rating, this.journeyId);
    }
   }


  ToCurrentFeedback(){
   /*
    let str = "viewRoute/";
    this.router.navigate(str + this.journey.routeId.toString());
    */
    this.router.navigate(['/feedback/' + this.journeyId]);
  }

}
