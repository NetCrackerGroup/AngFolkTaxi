import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { IUserAcc } from '../entities/iuseracc';
import { UserService } from '../services/user.service';
import {AuthService} from '../services/auth.service';

import { AccChangePassComponent } from '../acc-change-pass/acc-change-pass.component';
import { AccChangeNameComponent } from '../acc-change-name/acc-change-name.component';
import { AccChangeCityComponent } from '../acc-change-city/acc-change-city.component';
import { AccChangePhoneNumberComponent } from '../acc-change-phone-number/acc-change-phone-number.component';
import { AccChangeInfoComponent } from '../acc-change-info/acc-change-info.component';




@Component({
  selector: 'app-acc-edit',
  templateUrl: './acc-edit.component.html',
  styleUrls: ['./acc-edit.component.css'],
  providers: [NgbRatingConfig]
})
export class AccEditComponent implements OnInit {

  @ViewChild(AccChangePassComponent, {static: false})
   accChangePassComponent: AccChangePassComponent;

  @ViewChild(AccChangeNameComponent, {static: false})
   accChangeNameComponent: AccChangeNameComponent;

  @ViewChild(AccChangeCityComponent, {static: false})
   accChangeCityComponent: AccChangeCityComponent;

  @ViewChild(AccChangePhoneNumberComponent, {static: false})
   accChangePhoneNumberComponent: AccChangePhoneNumberComponent;

  @ViewChild(AccChangeInfoComponent, {static: false})
   accChangeInfoComponent: AccChangeInfoComponent;


  selectedFile: File = null;

  passengerRatingSwitch = true;
  driverRatingSwitch = true;
  infoIsNotNull : boolean;
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

  constructor(private config: NgbRatingConfig,
              private authService: AuthService,
              private userService : UserService,
              private router : Router) {

  }

  ngOnInit() {
     if (!this.isReg()){
       this.Exit();
       }
     else {
       this.config.max = 5;
       this.config.readonly = true;
       this.changeName = false;
       this.changeCity = false;
       this.changePhoneNumber = false;
       this.changeInfo = false;
       this.userService.getUserForPro().subscribe(
       res => {
        this.user.fio = res["fio"];
        this.user.phoneNumber = res["phoneNumber"];
        if (res["cityName"] == "Voronezh")
          this.user.cityName = "Воронеж";
        else if (res["cityName"] == "Moscow")
          this.user.cityName = "Москва";
        else if (res["cityName"] == "Lipetsk")
          this.user.cityName = "Липецк";
        this.user.passengerRating = res["passengerRating"];
        this.user.driverRating = res["driverRating"];
        this.user.passengerRating = res["passengerRating"];
        this.user.driverRating = res["driverRating"];
        this.user.info = res["info"];
        if(this.user.passengerRating == null || this.user.passengerRating == '0')
         this.passengerRatingSwitch = false;
        if(this.user.driverRating == null || this.user.driverRating == '0')
         this.driverRatingSwitch = false;
        if(this.user.info == null || this.user.info == "" || this.user.info == '')
         this.infoIsNotNull = false;
        else
         this.infoIsNotNull = true;
        if(res["image"] == null)
          this.imageSwitch = false;
        else
          this.user.image = 'data:image/jpeg;base64,' + res["image"];
       },
       err => {
         //alert("Пользоваель не найден!");
       });
     }
  }

  isReg(): boolean {
    return this.authService.logIn;
  }

  Exit(){
    this.router.navigate(['/']);
  }
  onFileSelected(event){
    if(event.target.files && event.target.files.length > 0){
      this.selectedFile = <File>event.target.files[0];
      //this.selectedFile = event.target.files;
      this.userService.updateUserImage(this.selectedFile);
      window.location.reload();
    }
  }

  receiveNewName($event) {
    this.user.fio = $event;
  }
  receiveNewCity($event) {
    this.user.cityName = $event;
  }
  receiveNewPhoneNumber($event) {
    this.user.phoneNumber = $event;
  }
  receiveNewInfo($event) {
    this.user.info = $event;
  }
  receiveInfoIsNotNull($event) {
    this.infoIsNotNull = $event;
    if(this.infoIsNotNull == false)
      window.location.reload();
  }
}
