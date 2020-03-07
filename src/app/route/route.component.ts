import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {any} from 'codelyzer/util/function';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit, OnChanges {
  private coords = [];
  private startPoint;
  private endPoint;
  url = 'http://localhost:1337';
  postUser = {
    routeBegin: undefined,
    routeEnd: undefined,
    price: undefined,
    countOfPlaces: undefined,
    startDate: Date
  };
  schedule = {
    timeOfJourney: undefined,
    scheduleDay: undefined
  };
  selectedDays = [false, false, false, false, false, false, false];
  isSingleRoute = false;

  constructor(private http: HttpClient) {
    this.http = http;
  }
  @ViewChild(YandexMapComponent, {static: false})
  private mapComponent: YandexMapComponent;

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
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
    });

  }

  async SomeClick(event) {
    // доделать задание координат при передвижении
    // if (this.coords.length === 2) {
    //   return;
    // } else {
    //   if (this.coords.length === 1) {
    //     this.endPoint = this.createPoint(event);
    //   } else {
    //     this.startPoint = this.createPoint(event);
    //   }
    // }
    // this.coords.push(event.event.get('coords'));
    // tslint:disable-next-line:max-line-length
   const route = new event.ymaps.multiRouter.MultiRoute({
      // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
      referencePoints: [
        'Москва, метро Смоленская',
        'Москва, метро Арбатская',
        [55.734876, 37.59308], // улица Льва Толстого.
      ]
    }, {
      // Автоматически устанавливать границы карты так,
      // чтобы маршрут был виден целиком.
      boundsAutoApply: true
    });
   console.log(route);
   event.event.originalEvent.map.geoObjects.add(route);
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
