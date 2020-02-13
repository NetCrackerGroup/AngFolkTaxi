import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YandexControlComponent} from 'angular8-yandex-maps/lib/components/yandex-control-component/yandex-control.component';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  @ViewChild('component', {static: false})
  yandexControlComponent: YandexControlComponent;

  url = 'http://localhost:1337';
  private postUser = {
    routeBegin: undefined,
    routeEnd: undefined,
    price: undefined,
  };
  public parameters = {
    options: {
      allowSwitch: false,
      reverseGeocoding: true,
      types: { masstransit: true, pedestrian: true, taxi: true }
    },
    state: {
      type: '',
      fromEnabled: true,
      from: this.postUser.routeBegin,
      toEnabled: true,
      to: ''

    }
  };
  constructor(private http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
  }


  createNewRoute() {
    console.log(this.postUser);
    this.http.post(this.url + '/routes/add', this.postUser).subscribe((resp) => {
      console.log(resp);
    });
  }

  async SomeClick(event) {
    console.log(this.yandexControlComponent);
    const ymaps = event.ymaps;
    ymaps.geocode('Москва, ул. Льва Толстого, 16')
      .then((res) => {
        console.log(
          res.geoObjects
          .get(0).geometry._coordinates
        );
      });

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

}
