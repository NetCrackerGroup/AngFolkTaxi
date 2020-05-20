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
  selector: 'app-rate-user',
  templateUrl: './rate-user.component.html',
  styleUrls: ['./rate-user.component.css']
})
export class RateUserComponent implements OnInit {

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
  image : string = "";
  user : IUserAcc = {
      fio : "",
      phoneNumber : "",
      cityName : "",
      passengerRating : "",
      driverRating : "",
      info : "",
      image : ""
    };

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
     userService.getUserByIdForAcc(params['driverId']).subscribe(
       res => {
         console.log(params['journeyId'] + params['driverId']);
         this.id = params['driverId'];
         this.journeyId = params['journeyId'];
         this.user = res;
       },
       err => {
         alert("Поездка не найдена!");
       });
      });
  }


  ngOnInit() {
  }

  Exit(){
    this.router.navigate(['/']);
    //s
  }

  /*RateDriver(driverId : string, rating : string, jId : string){
       console.log(this.rating);
       if (this.rating == null){
         alert("Заполните поле \"rating\" ");
       }
       else {
         this.userService.rateDriver(driverId, rating, jId);
       }
     }*/

  RateDriver() {
   console.log(this.rating);
   if (this.rating == null){
     alert("Заполните поле \"rating\" ");
   }
   else {
     this.userService.rateDriver(this.id, this.rating, this.journeyId);
   }
  }


  ToCurrentRoute(){
   /*
    let str = "viewRoute/";
    this.router.navigate(str + this.journey.routeId.toString());
    */
  }

}
