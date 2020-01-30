import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupsService } from '../services/groups.service'

@Component({
  selector: 'app-app-create',
  templateUrl: './app-create.component.html',
  styleUrls: ['./app-create.component.css']
})
export class AppCreateComponent implements OnInit {

  name : String = "";
  link : String = "";

  constructor( private groupsService : GroupsService) { }

  ngOnInit() {
  }

  submit(){
    console.log("Submit form!")
    this.groupsService.craeteGroup(this.name, this.link).subscribe(
      res => {
          console.log(res);
      },
      err => {
        alert("Ошибка")
      }
    );
  }

  addgroup(event : any) {
    let form : FormGroup = event as FormGroup
    console.log("Submit Form")
    form.disable()
  }

}
