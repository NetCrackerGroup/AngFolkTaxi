import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JourneyService } from '../services/journey.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { IJourney } from '../entities/ijourney';
import { UserService } from '../services/user.service';

import { ReportComponent } from '../report/report.component';
import { AccViewComponent } from '../acc-view/acc-view.component';

@Component({
  selector: 'app-rate-after-journey',
  templateUrl: './rate-after-journey.component.html',
  styleUrls: ['./rate-after-journey.component.css'],
  providers: [NgbRatingConfig]
})
export class RateAfterJourneyComponent implements OnInit {

  @ViewChild(ReportComponent, {static: false})
   reportComponent: ReportComponent;

  @ViewChild(AccViewComponent, {static: false})
   accViewComponent: AccViewComponent;

  accView : boolean;
  driverSwitch : boolean = false;
  rating : string = "";
  journey: IJourney = {
    journeyId : 0,
    routeId : 0,
    driverId : 0,
    driverName : "",
    passengers : []
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
     journeyService.getJourneyByIdForRate(params['id']).subscribe(
       res => {
         console.log(res["journeyId"]);
         this.journey.journeyId = res["journeyId"];
         if (this.journey.journeyId == null || this.journey.journeyId == 0)
          this.driverSwitch = true;
         this.journey.routeId = res["routeId"];
         this.journey.driverId = res["driverId"];
         this.journey.driverName = res["driverName"];
          if( res["journey"]!= null ) {
            this.journey.passengers = [];
            this.journey.passengers = res["journey"]["passengers"];
          }
         console.log(this.journey.driverId);
       },
       err => {
         //alert("Поездка не найдена!!!");
       });
      });
  }

  /*loadUsers(usersId) {
    let count = 0;
    usersId.forEach(element => {
      console.log(element);
      this.userService.getUserById(element).subscribe(
        res => {
            this.journey.passengers[count] = res;
            count+=1;
        },
        err => {
          console.log("Данные участников не удалось загруить!");
        }
      );
    });
  }*/


  ngOnInit() {
  }

  Exit(){
    this.router.navigate(['/']);
  }

  /*RateDriver(){
    console.log(this.driverRating);
    if (this.driverRating == null){
      alert("Заполните поле \"driverRating\" ");
    }
    else {
      this.userService.rateDriver(this.journey.driverId, this.driverRating);
    }
  }*/

  ToRateDriver(){
   this.router.navigate(['/rate-driver/{{journey.driverId}}']);
   }

  ToRatePassenger(){
   this.router.navigate(['/rate-passenger/{{passenger.passengerId}}']);
  }


  ToCurrentRoute(){
    /*
    let str = "viewRoute/";
    this.router.navigate(str.concat(this.journey.routeId.toString()));
    */
  }

}
