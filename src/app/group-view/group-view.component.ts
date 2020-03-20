import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import{ViewChild} from "@angular/core";

import { GroupsService } from "../services/groups.service";
import { IGroup } from '../entities/igroup';
import { IUser } from '../entities/iuser'
import { UserService } from '../services/user.service';
import {ApiService} from "../shared/api.service";
import{AppChatComponent} from "../app-chat/app-chat.component";

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css'],

})
export class GroupViewComponent implements OnInit {

  group : IGroup = {
    groupId : "",
    groupName : "",
    cityLink : "",
    typeGroup : { typeId : 0, nameType : ""},
    users : []
  };
  chatId:number;

  private subscription: Subscription;



  getgroupId():number{
    return   parseInt(this.group.groupId)}

  getChatId():number{
    return this.chatId
  }
  
  constructor(private groupsService : GroupsService, 
                private route: ActivatedRoute,
                private userService : UserService ,
                 private apiService:ApiService) {

                  this.subscription = route.params.subscribe(params=>{
                      groupsService.getGroup(params['id']).subscribe(
                      res => {
                        console.log(` Length - ${res["users"].length}`);
                        console.log(res["groupId"]);
                        this.group.groupId = res["groupId"];
                        this.group.groupName = res["groupName"];
                        this.group.cityLink = res["cityLink"];
                        this.group.typeGroup = res["typeGroup"];
                        //this.chatId =res["groupId"];
                        apiService.getChatByGroup(res["groupId"]).subscribe(
                          res => {
                            this.chatId = res["chatId"];
                          },
                          err => {
                            alert("An error has occured;")
                          }
                        );;


                        let count = 0;
                        res["users"].forEach(element => {
                          console.log(element);
                          userService.getUserById(element).subscribe(
                            res => {
                                this.group.users[count] = res;
                                count+=1;
                            },
                            err => {
                              alert("Данные участников не удалось загруить!");
                            }
                          );
                        });
                        console.log(this.group);
                        //this.group.groupId 
                      },
                      err => {
                        alert("Группа не найдена!")
                      }
                    );
                });
              }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params=> {
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
        ;}


        )
  }
    )
  }





  public getChatbyGroup() {
    this.apiService.getChatByGroup(this.group.groupId).subscribe(
      res => {
        this.chatId = res.chatId;
      },
      err => {
        alert("An error has occured;")
      }
    );
  }
}
