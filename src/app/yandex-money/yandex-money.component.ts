import { Component, OnInit, Input } from '@angular/core';
import { YandexService } from '../services/yandex.service';
import { ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';

export interface authYandex{
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
  @Input() routeId;
  @Input() type;

  constructor(
    private yandexService : YandexService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authYandex();
  }

  authYandex() {
    this.yandexService.getParametr(this.type).subscribe(
      (res) => {
        console.log(res["clientId"]);
        this.authParametrs = {
          clientId : res["clientId"] ,
          scope : res["scope"],
          redirect : res["redirect"]
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
}