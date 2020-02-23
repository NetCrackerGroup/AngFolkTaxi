import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {log} from 'util';
import {ifTrue} from 'codelyzer/util/function';

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
  private postUser = {
    routeBegin: undefined,
    routeEnd: undefined,
    price: undefined,
    schedule: undefined,
    time: undefined,
    countOfPlaces: undefined,
    selectedDays: undefined
  };
  private selectedDays = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  };
  // public parameters = {
  //   options: {
  //     allowSwitch: false,
  //     reverseGeocoding: true,
  //     types: { masstransit: true, pedestrian: true, taxi: true }
  //   },
  //   state: {
  //     type: 'masstransit',
  //     fromEnabled: true,
  //     from: '',
  //     toEnabled: true
  //   }
  // };
  constructor(private http: HttpClient) {
    this.http = http;
  }

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
    this.postUser.selectedDays = Object.values(this.selectedDays);
    for (let i = 0; i < Object.values(this.selectedDays).length; i++) {
      this.postUser.selectedDays[i] ? this.postUser.selectedDays[i] = 1 : this.postUser.selectedDays[i] = 0;
    }
    this.postUser.routeBegin = this.startPoint.__zone_symbol__value.geometry._coordinates;
    this.postUser.routeEnd = this.endPoint.__zone_symbol__value.geometry._coordinates;

    this.http.post(this.url + '/routes/add', this.postUser).subscribe((resp) => {
      console.log(resp);
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


}