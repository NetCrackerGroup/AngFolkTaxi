import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import { GroupsService } from "../services/groups.service";
import { IGroup } from '../entities/igroup';
import { IUser } from '../entities/iuser'
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  loginCheck : boolean;
  entryGroup : boolean;
  

  group : IGroup = {
    groupId : 0,
    groupName : "",
    cityLink : "",
    typeGroup : { typeId : 0, nameType : ""},
    users : []
  };

  private subscription: Subscription;
  
  constructor(private groupsService : GroupsService, 
                private route: ActivatedRoute,
                private userService : UserService,
                private  authService : AuthService,
                private router : Router ) { 

    this.subscription = groupsService.getGroup(route.snapshot.params['id']).subscribe(
        res => {
          this.loadgroup(res);
        },
        err => {
          alert("Группа не найдена!")
        }
      );
  }
  
  handleResponse(res) {
    
    if( res["group"]!= null ) {
      this.group.users = [];
      this.loadUsers(res["group"]["users"]);
    }
    this.checkUserInGroup();
  }

  actgroup ( event : any ) {
    if (event.target.name == "connect") {
      console.log("connect");
      this.groupsService.act(this.group.groupId, "connect").subscribe(
        (res) => {
            this.handleResponse(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else if ( event.target.name == "leave") {
      console.log("leave");
      this.groupsService.act(this.group.groupId, "leave").subscribe(
        (res) => {
          this.handleResponse(res);
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  ngOnInit() {
    this.loginCheck = this.authService.logIn;
    if ( this.loginCheck ) {
      this.checkUserInGroup();
    }
  }

  repost(){
  }

  checkUserInGroup() {
    this.groupsService.checkUserInGroup(this.group.groupId).subscribe(
      (res) => {
        console.log(res);
        this.entryGroup = res["isInvolved"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadUsers(usersId) {
    let count = 0;
    usersId.forEach(element => {
      console.log(element);
      this.userService.getUserById(element).subscribe(
        res => {
            this.group.users[count] = res;
            count+=1;
        },
        err => {
          console.log("Данные участников не удалось загруить!");
        }
      );
    });
  }

  loadgroup(res : any) {
    console.log(` Length - ${res["users"].length}`);
    console.log(res["groupId"]);
    this.group.groupId = res["groupId"];
    this.group.groupName = res["groupName"];
    this.group.cityLink = `${environment.devUrl}/entrypoint/${res["cityLink"]}`;
    this.group.typeGroup = res["typeGroup"];
    let count = 0;
    this.loadUsers(res["users"]);
    if ( this.loginCheck ) {
      this.checkUserInGroup();
    }
  }
}