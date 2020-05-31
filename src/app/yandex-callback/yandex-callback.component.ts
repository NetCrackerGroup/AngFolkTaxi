import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { YandexService } from '../services/yandex.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-yandex-callback',
  templateUrl: './yandex-callback.component.html',
  styleUrls: ['./yandex-callback.component.css']
})
export class YandexCallbackComponent implements OnInit {

  message : string;
  successInfo : string;
  failureInfo : string; 

  constructor(
    private activateRoute: ActivatedRoute,
    private authService : AuthService,
    private yandexService : YandexService,
    private router: Router
    ) {
    activateRoute.queryParams.subscribe(
      param => {

        if (param['code'] != undefined && param["userID"] && param["journeyID"] != undefined && param["price"] != undefined ) 
        {
          console.log(param);
          let code = param['code'];
          let userID = param['userID'] as number;
          let journeyID = param['journeyID'] as number;
          let price = param['price'] as number;
          this.yandexService.thankForJourney(userID, journeyID, price, code).subscribe(
            res => {
              console.log(res);
              if (res["status"] == 'success') {
                this.successInfo = "Операция выполнена";
              }
              if (res["status"] == 'failure') {
                this.failureInfo = "Ошибка";
              }
            },
            err => {
              console.log(err);
            }
          );
        }

        else if ( authService.logIn ) { 
          console.log(param);
          if (param['code'] != undefined && param["who"] != undefined) {
            console.log(param['code']);
            if (param["who"] == "driver") {
              this.connectCashRoute(param['code'], param['routeId'] as number)
            }
            if (param["who"]  == "passenger") {
              this.passagerPayRoute(param['code'], param['routeId'] as number);
            }
          } 
          else if (param['code'] != undefined && param["target"] != undefined) {
            this.connectYandexPurse(param['code']);
            console.log(param["target"]);
          } 
          else {
            this.message = "Кажется что-то пошло не так!"
          }
        }
        else {
          this.message = "Кажется вы забыли авторизоваться!";
        }
      }
    )
   }

   connectCashRoute(code : string, routeID : number) {
    this.yandexService.connectCash( code, routeID)
    .subscribe(
      res => {
        console.log(res);
        console.log(res['status'] );
        if (res['status'] == "success") {
          this.router.navigate(["/myRoute", routeID]);
        }
        else {
          this.message = "Кажется что-то пошло не так!"
        }
      }, 
      err => {
        console.log(err);
      }
    );
   }

   passagerPayRoute(code : string, routeId : number) {
     this.yandexService.payRoute(routeId, code).subscribe(
       res => {
        console.log(res);
       },
       err => {
        console.log(err);
       }
     )
   }

  ngOnInit(): void {
  }

  connectYandexPurse(code : string) {
    this.yandexService.connectYandexPurse(code).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}