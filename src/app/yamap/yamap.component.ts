import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
declare var ymaps: any;

@Component({
  selector: 'app-yamap',
  templateUrl: './yamap.component.html',
  styleUrls: ['./yamap.component.css']
})
export class YamapComponent implements OnInit, OnChanges {
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
  url = environment.devUrl;
  @Input() fromEnabled = 1;
  @Input() toEnabled = 1;
  private http;
  map: any;
  constructor(private route: ActivatedRoute, http: HttpClient,
              private router: Router) {
    this.http = http;
  }

  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  create(from, to ) {
    console.log('changesngOnChanges');
    // @ts-ignore
    this.parameters.state.to = this.toEnabled;
    console.log(this.parameters.state.to);
    // @ts-ignore
    this.parameters.state.from = this.fromEnabled;
    console.log(this.parameters.state.from);
    if (this.map == null) {
      console.log('this.map == null');
      ymaps.ready().then(() => {
        this.map = new ymaps.Map('map', {
          center: [50.450100, 30.523400],
          zoom: 12,
          controls: ['routePanelControl']
        });
        return this.map;
        // tslint:disable-next-line:no-shadowed-variable
      }).then((res) => {
        console.log('1this.map == null');
        const let2 = this.map.controls.get('routePanelControl');
        let2.routePanel.state.set({
          // Адрес начальной точки.
          from,
          // Адрес конечной точки.
          to
        });
      });
    } else {
      const let2 =  this.map.controls.get('routePanelControl');
      let2.routePanel.state.set({
        // Адрес начальной точки.
        from,
        // Адрес конечной точки.
        to
      });
    }
  }
}
