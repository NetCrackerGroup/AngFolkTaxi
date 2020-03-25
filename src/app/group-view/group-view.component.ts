import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

import { GroupsService } from "../services/groups.service";
import { IGroup } from '../entities/igroup';
import { IUser } from '../entities/iuser'
import { UserService } from '../services/user.service';
import { AccViewComponent } from '../acc-view/acc-view.component';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  @ViewChild(AccViewComponent, {static: false})
   private accViewComponent: AccViewComponent;

  group : IGroup = {
    groupId : "",
    groupName : "",
    cityLink : "",
    typeGroup : { typeId : 0, nameType : ""},
    users : []
  };

  private subscription: Subscription;


  constructor(private groupsService : GroupsService,
              private route: ActivatedRoute,
              private userService : UserService
              ) {
                this.subscription = route.params.subscribe(params=>{
                    groupsService.getGroup(params['id']).subscribe(
                    res => {
                      console.log(` Length - ${res["users"].length}`);
                      console.log(res["groupId"]);
                      this.group.groupId = res["groupId"];
                      this.group.groupName = res["groupName"];
                      this.group.cityLink = res["cityLink"];
                      this.group.typeGroup = res["typeGroup"];
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
  }


}
