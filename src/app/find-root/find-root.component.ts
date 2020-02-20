import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-root',
  templateUrl: './find-root.component.html',
  styleUrls: ['./find-root.component.css']
})
export class FindRootComponent implements OnInit {

  adress: string = '';

  constructor() { }

  ngOnInit() {
  }

  submit() {
    if ( this.adress.trim().length === 0) {
      alert('Заполните поле "Адрес" ');
    } else {

    }
  }

}
