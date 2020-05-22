import { Component, OnInit, Input } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { RoutesService } from '../services/routes.service';
import { UserDetailsService } from '../services/user-details.service';
import { map, flatMap,filter } from 'rxjs/operators';
import {concat} from 'rxjs';
import { YandexService } from '../services/yandex.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pay-route',
  templateUrl: './pay-route.component.html',
  styleUrls: ['./pay-route.component.css']
})
export class PayRouteComponent implements OnInit {

  routeId : number;  
  @Input() driverId : number;
  @Input() driver : boolean;
  id : number;
  connectCash : boolean;
  payOnline : boolean;

  constructor(
    private userDetailsService : UserDetailsService,
    private routesService : RoutesService,
    private yandexService : YandexService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(
      data => {
        this.routeId = data['id'] as number;
        console.log(data);
        this.id = data['id'] as number;
        this.routesService.checkUserIsDriver(this.id).subscribe( (res: boolean) => {
          console.log('this.isDriver', res);
          this.driver = res['isDriver'];
          if ( this.driver ) {
            this.checkCash();
          }
          else {
            this.checkMember();
          }
        });
      },
      err => {
        console.log(err);
      }
    )
   }

   checkPayOnline() {
     console.log("Method payOnline")
    this.yandexService.payRouteChack(this.routeId).subscribe(
      res => {
        console.log("get Cash");
        console.log(res);
        if (res["status"] == 'failure'){
          this.payOnline = false;
        }
        else {
          this.payOnline = true;
        }
      },
      err => {
        console.log(err);
      }
    );
   }

   checkCash() {
    this.yandexService.payRouteChack(this.routeId).subscribe(
      res => {
        console.log("get Cash");
        console.log(res);
        if (res["status"] == 'failure'){
          this.connectCash = true;
        }
        else {
          this.connectCash = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  checkMember() {
    this.userDetailsService.getUserId().subscribe(
      res => {
        let id = res["id"];
        this.routesService.getAllMembers(this.routeId).pipe(
          flatMap(member => {
            console.log(member)
            return member}),
          filter(member => {
              console.log(id);
              console.log("split");
              console.log(member["id"]);
             return member["id"] == id})
        ).subscribe(
          data => {
            console.log(data);
            this.checkPayOnline();
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(2);
      }
    );
  }

  ngOnInit(): void {
  }
}