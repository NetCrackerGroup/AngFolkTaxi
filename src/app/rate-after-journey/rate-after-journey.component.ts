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
import {switchMap} from 'rxjs/operators';

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

  rateDriver : boolean;
  driverSwitch = true;
  rating = '';
  dId : number;
  journey: IJourney = {
    journeyId : 0,
    routeId : 0,
    driverId : 0,
    driverName : '',
    passengers : []
  };

  private subscription: Subscription;
  private journeyService;

  constructor(journeyService: JourneyService,
              private route: ActivatedRoute,
              private userService: UserService,
              config: NgbRatingConfig,
              private router: Router) {
     config.max = 5;
     config.readonly = false;
     this.rateDriver = false;
     this.journeyService = journeyService;



     // this.subscription = route.params.subscribe(params => {
     // journeyService.getJourneyByIdForRate(params.id).subscribe(
     //   res => {
     //     console.log(res.journeyId);
     //     this.journey.journeyId = res.journeyId;
     //     this.journey.routeId = res.routeId;
     //     this.journey.driverId = res.driverId;
     //     this.journey.driverName = res.driverName;
     //     this.journey.passengers = [];
     //     this.loadPassengers(res.group.users);
     //     console.log('driverId' + this.journey.journeyId);
     //   },
     //   err => {
     //     // alert("Поездка не найдена!!!");
     //   });
     //  });

  }

  loadPassengers(usersId) {
    let count = 0;
    usersId.forEach(element => {
      console.log(element);
      this.userService.getPassengerByIdForRate(element.userId).subscribe(
        res => {
            this.journey.passengers[count] = res;
            count += 1;
        }
      );
    });
  }


  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap(params => params.getAll('journeyId'))
    ).subscribe(data => {
      console.log('Пришедший роут', data);
      this.journeyService.getJourneyByIdForRate(+data).subscribe(
        (res: {journeyId, routeId, driverId, driverName, group, passengers: []}) => {
          console.log(res.journeyId);
          console.log('Пришедший роут', res);
          this.journey.journeyId = res.journeyId;
          this.journey.routeId = res.routeId;
          this.journey.driverId = res.driverId;
          //this.dId = res.driverId * 1;
          if (res.driverId == 0) {
            this.driverSwitch = false;
          }
          this.journey.driverName = res.driverName;
          this.journey.passengers = [];
          res.passengers.forEach(el => {
            console.log(el);
            // @ts-ignore
            this.journey.passengers.push({passengerId: el.userId, passengerName: el.fio});
          });
          // this.loadPassengers(res.passengers);
          console.log(this.journey.passengers);
          console.log(this.journey.driverId + " " + this.journey.journeyId);
        },
        err => {
          // alert("Поездка не найдена!!!");
        });
      // if (this.journey.journeyId === 0) {
      //   this.router.navigate(['/']);
      // }
      console.log(this.journey);
    });

  }

  Exit() {
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

  ToRateDriver() {
   this.router.navigate(['/rate-driver/{{journey.journeyId}}/{{dId}}']);
   }

  ToRatePassenger() {
   this.router.navigate(['/rate-passenger/{{passenger.passengerId}}']);
  }


  ToCurrentRoute() {
    /*
    let str = "viewRoute/";
    this.router.navigate(str.concat(this.journey.routeId.toString()));
    */
  }

}
