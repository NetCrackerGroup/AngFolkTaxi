import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {YandexMapComponent} from 'angular8-yandex-maps/lib/components/yandex-map-component/yandex-map.component';
import {YandexMultirouteComponent} from 'angular8-yandex-maps/lib/components/yandex-multiroute-component/yandex-multiroute.component';
import {group} from '@angular/animations';
declare var ymaps: any;

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css']
})

export class ViewRouteComponent implements OnInit {

  @ViewChild('component', {static: false})
  nameParagraph: YandexMapComponent;

  @ViewChild('element', {static: false})
  private element: HTMLElement;

  id: number;
  url = 'http://localhost:1337';
  private http: HttpClient;
  driverName: string;
  timeOfDriving;
  countOfPlaces;
  map: any;
  driverRaring: number;
  price;
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
  visibility = false;

  constructor(private route: ActivatedRoute, http: HttpClient) {
    this.http = http;

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(data => {
      this.id = +data;
      this.http.get(`${this.url}/routes/${this.id}`).subscribe((res: {routeBegin,
        routeEnd, startDate, price, userRouteDto: {fio, driverRating}, countOfPlaces, timeOfDriving}) => {
        console.log(res);
        this.parameters.state.from = res.routeBegin;
        this.parameters.state.to = res.routeEnd;
        this.price = res.price;
        this.countOfPlaces = res.countOfPlaces;
        this.timeOfDriving = res.timeOfDriving;
        this.driverRaring = res.userRouteDto.driverRating;
        this.driverName = res.userRouteDto.fio;
        // @ts-ignore
        const htmlElement = this.element.nativeElement as HTMLElement;
        htmlElement.style.width = ( `${res.userRouteDto.driverRating * 20}%`).toString();
        if ( this.map == null) {
          ymaps.ready().then(() => {
            this.map = new ymaps.Map('map', {
              center: [50.450100, 30.523400],
              zoom: 12,
              controls: ['routePanelControl']
            });
            return this.map;
            // tslint:disable-next-line:no-shadowed-variable
          }).then((res) => {
            const let2 =  this.map.controls.get('routePanelControl');
            let2.routePanel.state.set({
              // Адрес начальной точки.
              from: this.parameters.state.from,
              // Адрес конечной точки.
              to: this.parameters.state.to
            });
          });
        } else {
          const let2 =  this.map.controls.get('routePanelControl');
          let2.routePanel.state.set({
            // Адрес начальной точки.
            from: this.parameters.state.from,
            // Адрес конечной точки.
            to: this.parameters.state.to
          });
        }
        this.http.get(`${this.url}/schedule/route/${this.id}`).subscribe(res => {
          console.log(res);
          // @ts-ignore
          this.timeOfDriving = res.timeOfJourney;

        });
      });

    });
    }
    Some(event) {

      const route = new event.ymaps.multiRouter.MultiRoute({
        // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
        referencePoints: [
          this.parameters.state.from,
          this.parameters.state.to // улица Льва Толстого.
        ]
      }, {
        // Автоматически устанавливать границы карты так,
        // чтобы маршрут был виден целиком.
        boundsAutoApply: true
      });
      console.log(route);
      event.event.originalEvent.map.geoObjects.add(route);
    }


    JoinTheRoute() {
      if (this.countOfPlaces === 0) {
        this.visibility = !this.visibility;
      } else {
        const body = new HttpParams()
          .set('id', String(this.id));
        this.http.post(`${this.url}/routes/join`, body).subscribe(res => {
          this.countOfPlaces = this.countOfPlaces - 1;
        });
      }
    }
    toggle() {
      this.visibility = !this.visibility;
    }

}
