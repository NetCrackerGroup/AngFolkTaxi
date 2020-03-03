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
  private driverName: string;
  private timeOfDriving;
  private countOfPlaces;
  private price;
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
        console.log(`${this.url}/routes/${this.id}`);
        this.http.get(`${this.url}/routes/${this.id}`).subscribe(res => {
           // @ts-ignore
          this.parameters.state.from = res.routeBegin;
          // @ts-ignore
          this.parameters.state.to = res.routeEnd;
          console.log(this.parameters);
          console.log(res);
          // @ts-ignore
          const date = new Date(res.startDate);

          console.log(date.getHours());


        });
      });

  }

}
