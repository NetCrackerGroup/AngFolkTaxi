import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RoutesService} from '../services/routes.service';
import {IRoute} from '../entities/iroute';
//import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-find-root',
  templateUrl: './find-route.component.html',
  styleUrls: ['./find-route.component.css']
})
export class FindRouteComponent implements OnInit, OnChanges{

  private adress = '';
  private radius = 0;
  private depart = '';

  private coords = [];
  private startPoint;
  private endPoint;

  private listRoutes: IRoute[] = null;

  constructor(private  routeService: RoutesService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
  }

  submit() {
    if (this.adress.trim().length === 0) {
      alert('Заполните поле "Адрес" ');
    } else if (this.depart.trim().length === 0) {
      alert('Заполните поле "Время отправления" ');
    } else if (this.radius === 0) {
      alert('Заполните поле "Расстояние" ');
    } else {
      this.routeService.getClosestRoutes(this.adress, this.radius, this.depart);
    }
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

}
