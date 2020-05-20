import { Component, OnInit, Input } from '@angular/core';
import { YandexService } from '../services/yandex.service';
import { ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';

interface authYandex{
  clientId : string,
  scope : string,
  redirect : string
}

@Component({
  selector: 'app-yandex-money',
  templateUrl: './yandex-money.component.html',
  styleUrls: ['./yandex-money.component.css']
})
export class YandexMoneyComponent implements OnInit {

  authParametrs : authYandex;
  url : string;
  //@Input() routeId;

  constructor(
    private yandexService : YandexService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(window.location.hash);
    this.url = `${environment.devUrl}/yandex/driver`;
    console.log(this.activateRoute.url);
    console.log(this.activateRoute.params);
    this.activateRoute.queryParams.subscribe(
      (data) => {
        console.log(data);
        console.log(data["code"]);
      }
    )
    console.log("Init yandex money");
    this.authYandex();
  }


  authYandex() {
    this.yandexService.getParametr().subscribe(
      (res) => {
        console.log(res["clientId"]);
        this.authParametrs = {
          clientId : res["clientId"] ,
          scope : "account-info",
          redirect : res["redirect"]
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
