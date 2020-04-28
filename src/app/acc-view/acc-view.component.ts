import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUserAcc } from '../entities/iuseracc';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-view',
  templateUrl: './acc-view.component.html',
  styleUrls: ['./acc-view.component.css'],
  providers: [NgbRatingConfig]
})
export class AccViewComponent implements OnInit {

  visibility = false;

  passengerRatingSwitch = true;
  driverRatingSwitch = true;
  infoSwitch = true;
  imageSwitch = true;

  user : IUserAcc = {
    fio : "",
    phoneNumber : "",
    cityName : "",
    passengerRating : "",
    driverRating : "",
    info : "",
    image : ""
  };

  form : NgForm;

  constructor(private userService : UserService,
                 config: NgbRatingConfig,
                 form: NgForm) {
         config.max = 5;
         config.readonly = true;
         this.form = form;
  }

  Submited(form: NgForm) {
  }

  ngOnInit() {
  }

  OpenPopup(id : number) {
    console.log('OpenPopup', id);
    this.visibility = true;
    this.userService.getUserByIdForAcc(id).subscribe(
      res => {
        this.user.fio = res["fio"];
        this.user.phoneNumber = res["phoneNumber"];
        this.user.cityName = res["cityName"];
        this.user.passengerRating = res["passengerRating"];
        this.user.driverRating = res["driverRating"];
        this.user.passengerRating = res["passengerRating"];
        this.user.driverRating = res["driverRating"];
        this.user.info = res["info"];
        if(this.user.passengerRating == null || this.user.passengerRating == '0')
         this.passengerRatingSwitch = false;
        if(this.user.driverRating == null || this.user.driverRating == '0')
         this.driverRatingSwitch = false;
        if(this.user.info == null)
          this.infoSwitch = false;
        if(res["image"] == null)
          this.imageSwitch = false;
        else
          this.user.image = 'data:image/jpeg;base64,' + res["image"];
      },
      err => {
        alert("Пользоваель не найден!");
      });
  }

  toggle() {
    this.visibility = false;
  }

}
