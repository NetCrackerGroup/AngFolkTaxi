import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { IUserAcc } from '../entities/iuseracc';
import { UserService } from '../services/user.service';

import { AccChangePassComponent } from '../acc-change-pass/acc-change-pass.component';
import { AccChangeNameComponent } from '../acc-change-name/acc-change-name.component';
import { AccChangeCityComponent } from '../acc-change-city/acc-change-city.component';
import { AccChangePhoneNumberComponent } from '../acc-change-phone-number/acc-change-phone-number.component';
import { AccChangeInfoComponent } from '../acc-change-info/acc-change-info.component';
import { AccChangeEmailComponent } from '../acc-change-email/acc-change-email.component';




@Component({
  selector: 'app-acc-edit',
  templateUrl: './acc-edit.component.html',
  styleUrls: ['./acc-edit.component.css'],
  providers: [NgbRatingConfig]
})
export class AccEditComponent implements OnInit {

  @ViewChild(AccChangePassComponent, {static: false})
  private accChangePassComponent: AccChangePassComponent;

  @ViewChild(AccChangeNameComponent, {static: false})
  private accChangeNameComponent: AccChangeNameComponent;

  @ViewChild(AccChangeCityComponent, {static: false})
  private accChangeCityComponent: AccChangeCityComponent;

  @ViewChild(AccChangePhoneNumberComponent, {static: false})
  private accChangePhoneNumberComponent: AccChangePhoneNumberComponent;

  @ViewChild(AccChangeInfoComponent, {static: false})
  private accChangeInfoComponent: AccChangeInfoComponent;

  @ViewChild(AccChangeEmailComponent, {static: false})
  private accChangeEmailComponent: AccChangeEmailComponent;

  selectedFile: File = null;

  passengerRatingSwitch = true;
  driverRatingSwitch = true;
  infoIsNotNull = true;
  imageSwitch = true;

  changeName : boolean;
  changeCity : boolean;
  changePhoneNumber : boolean;
  changeInfo : boolean;
  user : IUserAcc = {
      fio : "",
      phoneNumber : "",
      cityName : "",
      passengerRating : "",
      driverRating : "",
      info : "",
      image : ""
  };

  constructor(config: NgbRatingConfig,
              private userService : UserService,
              private router : Router) {
     config.max = 5;
     config.readonly = true;
     this.changeName = false;
     this.changeCity = false;
     this.changePhoneNumber = false;
     this.changeInfo = false;
     userService.getUserForPro().subscribe(
     res => {
      this.user.fio = res["fio"];
      this.user.phoneNumber = res["phoneNumber"];
      this.user.cityName = res["cityName"];
      this.user.passengerRating = res["passengerRating"];
      this.user.driverRating = res["driverRating"];
      this.user.passengerRating = res["passengerRating"];
      this.user.driverRating = res["driverRating"];
      this.user.info = res["info"];
      if(this.user.passengerRating == null)
       this.passengerRatingSwitch = false;
      if(this.user.driverRating == null)
       this.driverRatingSwitch = false;
      if(this.user.info == null)
       this.infoIsNotNull = false;
      if(res["image"] == null)
        this.imageSwitch = false;
      else
        this.user.image = 'data:image/jpeg;base64,' + res["image"];
     },
     err => {
       alert("Пользоваель не найден!");
     });
  }

  ngOnInit() {
  }
  Exit(){
    this.router.navigate(['/']);
  }
  onFileSelected(event){
    if(event.target.files && event.target.files.length > 0){
      this.selectedFile = <File>event.target.files[0];
      this.userService.updateUserImage(this.selectedFile);
    }
  }

}
