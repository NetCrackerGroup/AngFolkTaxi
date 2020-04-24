import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RoutesService} from '../services/routes.service';
import {UserService} from '../services/user.service';
import {IRoute} from '../entities/iroute';
import {IGroup} from '../entities/igroup';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {any} from 'codelyzer/util/function';
import {AngularYandexMapsModule} from 'angular8-yandex-maps';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-find-root',
  templateUrl: './find-route.component.html',
  styleUrls: ['./find-route.component.css']
})
export class FindRouteComponent implements OnInit, OnChanges{

  adress = '';
  stRadius = undefined;
  enRadius = undefined;
  dateDepart : Date = new Date('2020-03-18');
  //dateDepart = element(by.binding('dateDepart | date: "yyyy-MM-dd"'));
  dep = undefined;
  time = undefined;
  indexOfGroup = -1;
  groupLabel = 'Без поиска по группе';
  listGroups: IGroup[] = null;
  authService: AuthService;

  private coords = [];
  private startPoint = null;
  private endPoint = null;
  private listRoutes: IRoute[] = null;

  constructor(private  routeService: RoutesService, private router: Router, authService: AuthService,
   private userService: UserService) {
      this.authService = authService;
  }

  ngOnInit() {
    if(this.authService.logIn){
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
  }

  chooseGroup(i: number, name: string) {
    this.indexOfGroup = i;
    this.groupLabel = name;
  }

  submit() {
    if (this.stRadius === 0 || this.enRadius === 0) {
      alert('Заполните поле "Расстояние" ');
    } else if (this.startPoint === null || this.endPoint === null){
      alert('Выберите точки отправления и прибытия" ');
    } else {
    //  this.dep = this.dateDepart.toLocaleString().split(",")[0];

      if(this.indexOfGroup != -1){
      this.routeService.getClosestRoutes(this.startPoint.__zone_symbol__value.geometry._coordinates,
        this.endPoint.__zone_symbol__value.geometry._coordinates, this.stRadius, this.enRadius,
        this.dep, this.time, this.listGroups[this.indexOfGroup].groupId);
      }
      else{
        this.routeService.getClosestRoutes(this.startPoint.__zone_symbol__value.geometry._coordinates,
          this.endPoint.__zone_symbol__value.geometry._coordinates, this.stRadius, this.enRadius,
          this.dep, this.time, 0);
      }
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
