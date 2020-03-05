import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css']
})
export class ViewRouteComponent implements OnInit {

  id: number;
  url = 'http://localhost:1337';
  private http: HttpClient;
   driverName: string;
   timeOfDriving;
   countOfPlaces;
   price;
  public parameters = {
    options: {
      allowSwitch: false,
      reverseGeocoding: true,
      types: { taxi: true }
    },
    state: {
      type: 'taxi',
      fromEnabled: true,
      from: '',
      toEnabled: true,
      to: '',
    }
  };

  constructor(private route: ActivatedRoute, http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data => {
        this.id = +data;
        this.http.get(`${this.url}/routes/${this.id}`).subscribe(res => {
           // @ts-ignore
          this.parameters.state.from = res.routeBegin;
          // @ts-ignore
          this.parameters.state.to = res.routeEnd;
          console.log(res);
          // @ts-ignore
          const date = new Date(res.startDate);
          console.log(date.getHours());
          // @ts-ignore
          this.price = res.price;
          // @ts-ignore
          this.countOfPlaces = res.countOfPlaces;
        });
        this.http.get(`${this.url}/schedule/route/${this.id}`).subscribe(res => {
          console.log(res);
        });
      });

  }

}
