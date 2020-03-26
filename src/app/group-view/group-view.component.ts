import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import { GroupsService } from "../services/groups.service";
import { IGroup } from '../entities/igroup';
import { IUser } from '../entities/iuser'
import { UserService } from '../services/user.service';

import { AccViewComponent } from '../acc-view/acc-view.component';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ApiService } from "../shared/api.service";
import{ AppChatComponent } from "../app-chat/app-chat.component";


@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css'],

})
export class GroupViewComponent implements OnInit {


  @ViewChild(AccViewComponent, {static: false})
   private accViewComponent: AccViewComponent;

  loginCheck : boolean;
  entryGroup : boolean;


  group : IGroup = {
    groupId : 0,
    groupName : "",
    groupLink : "",
    typeGroup : { typeId : 0, nameType : ""},
    users : []
  };
  chatId:number;

  id: number;
  private subscription: Subscription;

  private subscriptionChat : Subscription;
  private routeSubscription: Subscription;

  getChatId():number{
    return this.chatId
  }

  constructor(private groupsService : GroupsService,
                private route: ActivatedRoute,
                private userService : UserService,
                private  authService : AuthService,
                private router : Router,
                private apiService:ApiService) {
    this.routeSubscription = route.params.subscribe(params=>
      {
        this.id=params['id'];
        groupsService.getGroup(this.id).subscribe(
          res => {

            this.loadgroup(res);
          },
          err => {
            alert("Группа не найдена!");
          }
        );
    });
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
    console.log(` ID : ${this.id} `);
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

  copyGroupLink(linkGroup){
    linkGroup.select();
    document.execCommand("copy");
    linkGroup.setSelectionRange(0, 0);
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
    this.group.groupLink = `${environment.devUrlFront}/entrypoint/${res["cityLink"]}`;
    this.group.typeGroup = res["typeGroup"];
    let count = 0;
    this. apiService.getChatByGroup(res["groupId"]).subscribe(
      res => {
        this.chatId = res["chatId"];
      },
      err => {
        alert("An error has occured;")
      }
    );
    this.loadUsers(res["users"]);
    if ( this.loginCheck ) {
      this.checkUserInGroup();
    }

    this.subscriptionChat = this.route.params.subscribe(params=> {
      this.groupsService.getGroup(params['id']).subscribe(
        res => {

          this.apiService.getChatByGroup(res["groupId"]).subscribe(
            res => {
              this.chatId = res["chatId"];
              console.log(this.chatId);
            },
            err => {
              alert("An error has occured;")
            }
          );
        ;
      }


        )
  }
    )
  }

  public getChatbyGroup() {
    this.apiService.getChatByGroup(this.group.groupId.toString()).subscribe(
      res => {
        this.chatId = res.chatId;
      },
      err => {
        alert("An error has occured;")
      }
    );
  }

}

