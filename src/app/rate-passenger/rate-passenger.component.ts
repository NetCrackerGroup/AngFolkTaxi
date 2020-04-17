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

  rating : string = "";
  id : number = 0;
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
     userService.getUserByIdForAcc(params['id']).subscribe(
       res => {
         //console.log(res["journeyId"]);
         this.id = params['id'];
         this.user = res;
         //console.log(this.journey.Id);
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
  }

   RatePassenger(){
     console.log(this.rating);
     if (this.rating == null){
       alert("Заполните поле \"rating\" ");
     }
     else {
       this.userService.ratePassenger(this.id, this.rating);
     }
   }


  ToCurrentRoute(){
   /*
    let str = "viewRoute/";
    this.router.navigate(str + this.journey.routeId.toString());
    */
  }

}
