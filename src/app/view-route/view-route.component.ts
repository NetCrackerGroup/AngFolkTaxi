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
declare var ymaps: any;

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css'],
  providers: [YamapComponent]
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
  map: any;
  driverRaring: number;
  price;
  modalText = 'В маршруте нет мест';
  dateOfJourney;
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
  constructor(private route: ActivatedRoute, http: HttpClient,
              private router: Router) {
    this.http = http;

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
        // @ts-ignore
        const htmlElement = this.element.nativeElement as HTMLElement;
        htmlElement.style.width = ( `${res.userRouteDto.driverRating * 20}%`).toString();
        this.dateOfJourney = new Date(res.startDate).toLocaleDateString();
        this.http.get(`${this.url}/schedule/route/${this.id}`).subscribe((res2: {timeOfJourney, scheduleDay, startDate}) => {
          // @ts-ignore
          const date = new Date(res2.startDate);
          this.dateOfJourney = new Date(res2.startDate).toLocaleDateString();
          this.timeOfDriving = res2.timeOfJourney;
          // @ts-ignore
          let scheduleString = (+res2.scheduleDay).toString(2);
          if (+scheduleString !== 0) {
            this.userDays = [];
            if (scheduleString.length !== 7) {
              let resString = '';
              for (let i = 0; i < 7 - scheduleString.length; i++) {
                resString += '0';
              }
              scheduleString = resString + scheduleString;
            }
            for (let i = 0; i < scheduleString.length; i++) {
              if (+scheduleString[i] === 1) {
                this.userDays.push(this.daysOfWeek[i]);
              }
            }
            this.isManyDays = true;
          } else {
            this.isManyDays = false;
          }

        });
      });

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
