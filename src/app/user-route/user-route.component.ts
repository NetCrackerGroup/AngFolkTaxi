import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ViewRouteComponent} from '../view-route/view-route.component';
import {HttpClient} from '@angular/common/http';
import {YamapComponent} from '../yamap/yamap.component';
import {ApiService} from '../shared/api.service';
import {AccViewComponent} from '../acc-view/acc-view.component';
import {environment} from '../../environments/environment';
import {IUserAcc} from '../entities/iuseracc';
import {UserService} from '../services/user.service';
import {log} from 'util';
import {RoutesService} from '../services/routes.service';
declare var ymaps: any;

@Component({
  selector: 'app-user-route',
  templateUrl: './user-route.component.html',
  styleUrls: ['./user-route.component.css'],
  providers: [YamapComponent]
})
export class UserRouteComponent implements OnInit {

  @ViewChild('component2', {static: false})
  accViewComponent: AccViewComponent;
  private routeService: any;
  routeID : number;
  driverId: number;
  isDriver = false;
  isDriven = false;
  loadStatusDriver : boolean;
  constructor(private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService,
              private userService: UserService, routeService: RoutesService) {
  this.routeService = routeService;
  }
  imageSwitch = true;
  user: IUserAcc = {
    fio : '',
    phoneNumber : '',
    cityName : '',
    passengerRating : '',
    driverRating : '',
    info : '',
    image : 'https://img2.freepng.ru/20180511/htq/kisspng-the-law-office-of-steve-slough-business-medicine-m-5af52751a56ac3.3981210115260158256776.jpg'
  };
  @ViewChild('component', {static: false})
  component: YamapComponent;

  url = environment.devUrl;

  fromEnabled = 1;
  toEnabled = 1;
  dateOfJourney;
  users;
  map: any;
  id;
  price;
  countOfPlaces;
  timeOfDriving;
  driverRaring;
  driverName;

  public daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  public userDays = [];
  chatId: number;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(data => {
      this.routeID = data as unknown as number;
      console.log(data);
      this.id = +data;
      this.http.get(`${this.url}/routes/${this.id}`).subscribe((res: {
        routeBegin,
        routeEnd, startDate, price, userRouteDto: { fio, driverRating }, countOfPlaces, timeOfDriving
      }) => {
        console.log(res);

        this.price = res.price;
        this.countOfPlaces = res.countOfPlaces;
        this.timeOfDriving = res.timeOfDriving;
        this.driverRaring = res.userRouteDto.driverRating;
        this.driverName = res.userRouteDto.fio;
        this.fromEnabled = res.routeBegin;
        this.toEnabled = res.routeEnd;
        this.component.create(this.fromEnabled, this.toEnabled);
        this.http.get(`${this.url}/schedule/route/${this.id}`).subscribe((res2: { timeOfJourney, scheduleDay, startDate }) => {
          console.log('res2', res2);
          // @ts-ignore
          this.timeOfDriving = res2.timeOfJourney;
          // @ts-ignore
          let scheduleString = (+res2.scheduleDay).toString(2);
          this.dateOfJourney = new Date(res2.startDate).toLocaleDateString();
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
        this.http.get(`${this.url}/routes/users/${this.id}`).subscribe((responce: { userId, fio, email, phoneNumber }) => {
          this.users = Array.of(responce)[0];
        });
      });
    });
    this.apiService.getChatByRoute(this.id).subscribe(
      res => {
        this.chatId = res.chatId;
      },
      err => {
        alert('An error has occured;');
      }
    );
    this.routeService.getRouteDriver(this.id).subscribe(

      (res) => {
        if (res === '') {
          this.imageSwitch = false;

        } else {
          this.user.image = 'data:image/jpeg;base64,' + res;
        }
      },
      err => {
        console.log('Пользоваель не найден! err', err);
      });
    this.http.get(`${this.url}/routes/driverId/${this.id}`).subscribe( (id: number) => {
      this.driverId = id;
    });
    this.routeService.checkUserIsDriver(this.id).subscribe( (res: boolean) => {
      console.log('this.isDriver', res);
      this.isDriver = res['isDriver'];
      this.loadStatusDriver = true;
    });
  }

  openJourneyInfo() {
  }

  startRoute() {
    this.routeService.startRouter(this.id).subscribe( (res: boolean) => {
      if (!res) {
        alert('вы уже ездили');
      } else {
        this.isDriven = true;
      }
    } );
  }

  endRoute() {
    this.routeService.endRouter(this.id).subscribe(res => {
      this.isDriven = false;
    });
  }
}