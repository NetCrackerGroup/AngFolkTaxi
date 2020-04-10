import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-change-city',
  templateUrl: './acc-change-city.component.html',
  styleUrls: ['./acc-change-city.component.css']
})
export class AccChangeCityComponent implements OnInit {

  @Output() newCityEvent = new EventEmitter<string>();

  visibility = false;
  newCity : string = "";
  form : NgForm;

  constructor(private userService : UserService,
              form: NgForm,
              private router : Router) {
     this.form = form;
  }

  Submited(form: NgForm) {
   this.userService.updateUserCity(this.newCity);
   this.visibility = false;
   this.newCityEvent.emit(this.newCity);
   this.router.navigate(['/profile']);
  }

  ngOnInit() {
  }

  OpenPopup(cityName : string) {
    this.newCity = cityName;
    this.visibility = true;
  }

  toggle() {
    this.visibility = false;
  }

}
