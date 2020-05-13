import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUserAcc } from '../entities/iuseracc';
import { UserService } from '../services/user.service';
import {RoutesService} from "../services/routes.service";
import {GroupsService} from "../services/groups.service";
import {IUser} from "../entities/iuser";

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
  routeId:number;
  userId :number;
  need = false;
  isDriver : boolean;
  groupId : number;
  loggedUser : number;
  isModeratorGroup : boolean;

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
              private routeService : RoutesService,
              private router : Router,
              private groupService : GroupsService,
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

  OpenPopup(id : number,idRoute : number, idGroup: number) {
    console.log('OpenPopup', id);
    this.visibility = true;
    if(idRoute!=null) {
      this.routeId = idRoute;
    }
    if(idGroup!=null){
       this.groupId = idGroup;
    }
    this.userId = id;
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

    this.userService.getLoggedUser().subscribe(
      res =>{
        this.loggedUser = res['isLogged']

      },
      err => {
        alert("Error has occured")
      }
    )
       if(idRoute!=null) {
         this.routeService.checkUserIsDriver(idRoute).subscribe(
           (res) => {
             console.log(res);
             this.isDriver = res["isDriver"];
           },
           (err) => {
             console.log(err);
           }
         );
       }
       if(idGroup!=null){
         this.groupService.checkUserIsModeratorGroup(idGroup).subscribe(
           (res) => {
             console.log(res);
             this.isModeratorGroup = res["isModerator"];
           },
           (err) => {
             console.log(err);
           }
         );
       }



    
  }

  toggle() {
    this.visibility = false;
    if(this.need){
      window.location.reload();
      
    }
  }

  deleteUser() {
    this.routeService.deleteUser(this.routeId,this.userId).subscribe(
      res=>{
        console.log(res["route"]["users"]);
        this.need = true;
        alert("Участник удален");
      },
      err=>{
        console.log(err);
      }
    );
    
  }
  public deleteUserGroup(){
    this.groupService.deleteUser(this.groupId,this.userId).subscribe((res) => {
        console.log(res);
        this.need = true;
        alert("Участник удален")

      },

      err => {alert("An error has occured")});



  }
  public complain(){
    this.router.navigate(['/complain' , this.userId])
  }
}
