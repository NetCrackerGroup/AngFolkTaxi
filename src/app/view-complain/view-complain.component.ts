import { Component, OnInit } from '@angular/core';
import {IComplain} from '../entities/icomplain'
import {IUser} from '../entities/iuser'
import {IUser_moderator} from '../entities/iuser_moderator'
import { UserService } from '../services/user.service';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import { ComplainService } from '../services/complain.service';

@Component({
  selector: 'app-view-complain',
  templateUrl: './view-complain.component.html',
  styleUrls: ['./view-complain.component.css']
})
export class ViewComplainComponent implements OnInit {

  complains: IComplain[]
  user:IUser = {
    userId : null,
    fio : '',
    email : '',
    phoneNumber : '',

  }
  userId:number;
  private subscription: Subscription;

  constructor(private userService: UserService,private route: ActivatedRoute, private complainService: ComplainService) {

    this.subscription = route.params.subscribe(params=>
    {
      this.user.userId=params['userId'];
      userService.getUserById(params['userId']).subscribe(
        res=>{
          this.user.fio = res['fio'];
          this.user.email = res['email'];
          this.user.phoneNumber = res['phoneNumber'];

        },
        err=>{
          alert("Пользователь не найден")

        }
      )
    });
    this.getComplains();
  }

  ngOnInit(): void {
    this.getComplains();
  }
  
  
  getComplains(){
    this.complainService.getComplainsByUser(this.user.userId).subscribe(
      res=>{
        this.complains = res;
      },
      err=>{
        alert("Error has occured");
      }
    );
  }
  ban(){
    console.log("pf,fyuty");
  }



}
