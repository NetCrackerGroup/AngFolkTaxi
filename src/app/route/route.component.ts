import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {any} from 'codelyzer/util/function';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserService} from '../services/user.service';
import {IGroup} from '../entities/igroup';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit, OnChanges {



  private coords = [];
  private startPoint;
  private endPoint;

  url = environment.devUrl;
  indexOfGroup = -1;
  groupLabel = 'Без привязки к группе';
  listGroups: IGroup[] = null;

  postUser = {
    routeBegin: undefined,
    routeEnd: undefined,
    price: undefined,
    countOfPlaces: undefined,
    startDate: Date,
    groupId: undefined
  };
  schedule = {
    timeOfJourney: undefined,
    scheduleDay: undefined,
    startDate: undefined
  };
  selectedDays = [false, false, false, false, false, false, false];
  isSingleRoute = false;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.http = http;
  }


  ngOnInit() {
    this.userService.getUserGroups().subscribe(
        res => {
          console.log(res);
          this.listGroups = res;
        },
        err => {
          alert(`Error , ${err}`);
          console.log(`Error , ${err}`);
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
  }

  chooseGroup(i: number, name: string) {
    this.indexOfGroup = i;
    this.groupLabel = name;
  }

  createNewRoute() {
    if (this.startPoint == null || this.endPoint == null ) {
      console.log('не всё');
      return;
    }
    const res = [];
    for (let i = 0; i < Object.values(this.selectedDays).length; i++) {
      this.selectedDays[i] ? res[i] = 1 : res[i] = 0;
    }
    this.postUser.routeBegin = this.startPoint.__zone_symbol__value.geometry._coordinates;
    this.postUser.routeEnd = this.endPoint.__zone_symbol__value.geometry._coordinates;
    if(this.indexOfGroup == -1){
      this.postUser.groupId = 0;
    }
    else{
      this.postUser.groupId = this.listGroups[this.indexOfGroup].groupId;
    }
    this.schedule.scheduleDay =  res;
    console.log(this.postUser.startDate);
    let body;

    if (this.isSingleRoute) {
      for (let i = 0; i < Object.values(this.selectedDays).length; i++) {
        this.schedule.scheduleDay[i] = 0;
      }
    }
    console.log(this.schedule.scheduleDay.join(''));
    this.schedule.scheduleDay = this.schedule.scheduleDay.join('');
    console.log(this.schedule);
    body = new HttpParams()
      .set('postUser', JSON.stringify(this.postUser))
      .set('selectedDays', JSON.stringify(this.schedule));
    console.log(body);
    this.http.post(this.url + '/routes/add',  body).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['']);
    });

  }

  async SomeClick(event) {
    // доделать задание координат при передвижении
        if (this.coords.length === 2) {
          return;
        } else {
          if (this.coords.length === 1) {
            this.endPoint = this.createPoint(event);
          } else {
            this.startPoint = this.createPoint(event);
          }
        }
        this.coords.push(event.event.get('coords'));
  }

  async createPoint(event) {
    const Point =  new event.ymaps.Placemark(event.event.get('coords'), {
      iconCaption: await event.ymaps.geocode(event.event.get('coords')).then( (res) => {
        return res.geoObjects.get(0).getAddressLine();
      })
    }, {
      preset: 'islands#violetDotIconWithCaption',
      // перемещение
      draggable: true
    });

    event.event.originalEvent.map.geoObjects.add(Point);
    // tslint:disable-next-line:no-unused-expression
    Point.events.add('dragend', () => {

      Point.properties.set('iconCaption', 'поиск...');
      event.ymaps.geocode(Point.geometry._coordinates).then( (res) => {
        const firstGeoObject = res.geoObjects.get(0);

        Point.properties
          .set({
            // Формируем строку с данными об объекте.
            iconCaption: [
              // Название населенного пункта или вышестоящее административно-территориальное образование.
              firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
              // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
            ].filter(Boolean).join(', '),
            // В качестве контента балуна задаем строку с адресом объекта.
            balloonContent: firstGeoObject.getAddressLine()
          });
      });
    });
    return Point;
  }
  dayClick(event) {
    this.selectedDays[event.target.id] = !this.selectedDays[event.target.id];
  }

  notSingleRoute() {
    this.isSingleRoute = false;
  }

  singleRoute() {
    this.isSingleRoute = true;
  }
}
