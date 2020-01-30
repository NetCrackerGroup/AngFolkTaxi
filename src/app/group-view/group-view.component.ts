import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import { GroupsService } from "../services/groups.service";
import { IGroup } from '../entities/igroup';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  group : IGroup ;
  private subscription: Subscription;
  
  constructor(private groupsService : GroupsService, 
                private route: ActivatedRoute) { 
                  this.subscription = route.params.subscribe(params=>{
                      groupsService.addGroup(params['id']).subscribe(
                      res => {
                        this.group = res;
                        console.log(this.group)
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
