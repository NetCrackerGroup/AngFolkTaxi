import { Component, OnInit } from '@angular/core';
import { authYandex } from '../yandex-money/yandex-money.component';
import { YandexService } from '../services/yandex.service';

@Component({
  selector: 'app-connect-yandex',
  templateUrl: './connect-yandex.component.html',
  styleUrls: ['./connect-yandex.component.css']
})
export class ConnectYandexComponent implements OnInit {

  authParametrs : authYandex;

  constructor(
    private yandexService : YandexService
  ) { }

  ngOnInit(): void {
    this.validPurse();
  }

  validPurse() {
    this.yandexService.checkValidPurse().subscribe(
      res => {
        console.log(res);
        if (res["status"] == 'failure')
          this.authYandex();
      },
      err => {
        console.log(err);
      }
    )
  }

  authYandex() {
    this.yandexService.getParametr('driver').subscribe(
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
