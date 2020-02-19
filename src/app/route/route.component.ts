import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit, OnChanges {
  @ViewChild('component', {static: false})
  private yandexMapComponent: YandexMapComponent;

  private coords = [];
  private startPoint;
  private endPoint;
  url = 'http://localhost:1337';
  private postUser = {
    routeBegin: 58.600739,
    routeEnd: 38.600739,
    price: undefined,
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

    // const ymaps = event.ymaps;
    // ymaps.geocode([58.600739, 38.600739])
    //   .then((res) => {
    //     console.log(
    //       res.geoObjects
    //       .get(0).getAddressLine()
    //     );
    //   });

    // const headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    //   geocode: 'Moscow',
    //   apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4'
    //
    // });
    // const com = await this.http.get('https://geocode-maps.yandex.ru/1.x?geocode=Moscow&apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4');
    // com.subscribe((res: Response) => {
    //   JSON.parse(res.ymaps)
    //   console.log();
    // })

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


}
