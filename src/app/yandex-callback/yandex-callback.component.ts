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

  constructor(
    private activateRoute: ActivatedRoute,
    private authService : AuthService,
    private yandexService : YandexService,
    private router: Router
    ) {
    activateRoute.queryParams.subscribe(
      param => {
        if ( authService.logIn ) { 
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

}
