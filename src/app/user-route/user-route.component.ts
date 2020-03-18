import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ViewRouteComponent} from '../view-route/view-route.component';
import {HttpClient} from '@angular/common/http';
import {YamapComponent} from '../yamap/yamap.component';
declare var ymaps: any;

@Component({
  selector: 'app-user-route',
  templateUrl: './user-route.component.html',
  styleUrls: ['./user-route.component.css'],
  providers: [YamapComponent]
})
export class UserRouteComponent implements OnInit, OnChanges {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  @ViewChild('component', {static: false})
  component: YamapComponent;

  url = 'http://localhost:1337';

  fromEnabled = 1;
  toEnabled = 1;
  dateOfJourney;
  users ;
  map: any;
   id;
   price;
   countOfPlaces;
   timeOfDriving;
   driverRaring;
   driverName;

  public daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  public userDays = [];

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(data => {
      console.log(data);
      this.id = +data;
      this.http.get(`${this.url}/routes/${this.id}`).subscribe((res: {routeBegin,
        routeEnd, startDate, price, userRouteDto: {fio, driverRating}, countOfPlaces, timeOfDriving}) => {
        console.log(res);

        this.price = res.price;
        this.countOfPlaces = res.countOfPlaces;
        this.timeOfDriving = res.timeOfDriving;
        this.driverRaring = res.userRouteDto.driverRating;
        this.driverName = res.userRouteDto.fio;
        this.fromEnabled = res.routeBegin;
        this.toEnabled = res.routeEnd;
        this.component.create(this.fromEnabled, this.toEnabled);
        this.http.get(`${this.url}/schedule/route/${this.id}`).subscribe(res2 => {
          console.log(res2);
          // @ts-ignore
          this.timeOfDriving = res2.timeOfJourney;
          // @ts-ignore
          let scheduleString = (+res2.scheduleDay).toString(2);
          this.dateOfJourney = new Date(res.startDate).toLocaleDateString();
          console.log(scheduleString);
          this.userDays = [];
          if (scheduleString.length !== 7) {
            let resString = '';
            for (let i = 0; i < 7 - scheduleString.length; i++) {
              resString += '0';
            }
            scheduleString = resString + scheduleString;
          }
          console.log('scheduleString', scheduleString);
          for (let i = 0; i < scheduleString.length; i++) {
            if (+scheduleString[i] === 1) {
              this.userDays.push(this.daysOfWeek[i]);
            }
          }

        });
        this.http.get(`${this.url}/routes/users/${this.id}`).subscribe( (responce: {userId, fio, email, phoneNumber}) => {
          this.users = Array.of(responce)[0];
        });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
