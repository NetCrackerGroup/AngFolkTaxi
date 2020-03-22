import { Component, OnInit, Input } from '@angular/core';

import { IGroup } from '../entities/igroup';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit {

  @Input() listgroups: IGroup[];


  constructor(private  groupService: GroupsService) { }

  ngOnInit() {
  }


}
