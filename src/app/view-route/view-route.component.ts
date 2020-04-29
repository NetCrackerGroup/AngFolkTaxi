import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {YandexMultirouteComponent} from 'angular8-yandex-maps/lib/components/yandex-multiroute-component/yandex-multiroute.component';
import {group} from '@angular/animations';
import {IRoute} from '../entities/iroute';
import {YamapComponent} from '../yamap/yamap.component';
import {AccViewComponent} from '../acc-view/acc-view.component';
import {environment} from '../../environments/environment';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {RoutesService} from '../services/routes.service';
declare var ymaps: any;

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css'],
  providers: [YamapComponent, NgbRatingConfig]
})

export class ViewRouteComponent implements OnInit {

  @ViewChild('component', {static: false})
  component: YamapComponent;

  @ViewChild('component2', {static: false})
  accViewComponent: AccViewComponent;

  @ViewChild('element', {static: false})
  private element: HTMLElement;
  id: number;
  url = environment.devUrl;
  private http: HttpClient;
  driverName: string;
  timeOfDriving;
  countOfPlaces;
  // tslint:disable-next-line:max-line-length
  image = 'https://img2.freepng.ru/20180511/htq/kisspng-the-law-office-of-steve-slough-business-medicine-m-5af52751a56ac3.3981210115260158256776.jpg';
  map: any;
  driverRaring: number;
  price;
  modalText = 'В маршруте нет мест';
  dateOfJourney;
  driverId;
  imageSwitch;
  public isManyDays = false;
  public parameters = {
    options: {
      allowSwitch: false,
      reverseGeocoding: true,
      types: {taxi: true}
    },
    state: {
      type: 'taxi',
      fromEnabled: true,
      from: '',
      toEnabled: true,
      to: '',
    }
  };
  public daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  public userDays = [];

  visibility = false;
  public fromEnabled;
  public toEnabled;
  driverRatingSwitch = true;
  constructor(private route: ActivatedRoute, http: HttpClient,
              private router: Router, private config: NgbRatingConfig, private routeService: RoutesService) {
    this.http = http;
    config.max = 5;
    config.readonly = true;

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(data => {
      this.id = +data;
      this.http.get(`${this.url}/routes/${this.id}`).subscribe((res: {routeBegin,
        routeEnd, startDate, price, userRouteDto: {fio, driverRating}, countOfPlaces, timeOfDriving}) => {
        this.price = res.price;
        this.countOfPlaces = res.countOfPlaces;
        this.timeOfDriving = res.timeOfDriving;
        this.driverRaring = res.userRouteDto.driverRating;
        this.driverName = res.userRouteDto.fio;
        this.fromEnabled = res.routeBegin;
        this.toEnabled = res.routeEnd;
        this.component.create(res.routeBegin, res.routeEnd);

        this.dateOfJourney = new Date(res.startDate).toLocaleDateString();
      });
    });
    this.http.get(`${this.url}/routes/driverId/${this.id}`).subscribe( (id: number) => {
      this.driverId = id;
    });
    this.http.get(`${this.url}/schedule/route/${this.id}`).subscribe((res2: { timeOfJourney, scheduleDay, startDate }) => {
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
          this.isManyDays = true;
          this.userDays.push(this.daysOfWeek[i]);
        }
      }
      console.log('this.userDays', this.userDays);
    });
    this.routeService.getRouteDriver(this.id).subscribe(

      (res) => {
        if (res === '') {
          this.imageSwitch = false;

        } else {
          this.image = 'data:image/jpeg;base64,' + res;
        }
      },
      err => {
        console.log('Пользоваель не найден! err', err);
      });
    }

    JoinTheRoute() {
      if (this.countOfPlaces === 0) {
        this.modalText = 'В маршруте нет мест';
        this.visibility = !this.visibility;
      } else {
        const body = new HttpParams()
          .set('id', String(this.id));
        this.http.post(`${this.url}/routes/join`, body).subscribe(res => {
          if (res) {
            this.countOfPlaces = this.countOfPlaces - 1;
            this.router.navigate(['myRoute', this.id]);
          } else {
            this.modalText = 'ВЫ уже состоите в этом маршруте';
            this.toggle();
          }
        });
      }
    }
    toggle() {
      this.visibility = !this.visibility;
    }

}
