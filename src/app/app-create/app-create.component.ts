import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupsService } from '../services/groups.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-create',
  templateUrl: './app-create.component.html',
  styleUrls: ['./app-create.component.css']
})
export class AppCreateComponent implements OnInit {

  name : String = "";
  typeGroup : String = "";


  constructor( private groupsService : GroupsService,
              private router: Router) { }

  ngOnInit() {
  }

  submit(){
    console.log("Submit form!")
    if ( this.name.trim().length == 0) {
      alert("Заполните поле \"Название\" ");
    }
    else if (this.typeGroup.trim().length == 0)
    {
      alert("Выберите тип группы!");
    }
    else {
      this.groupsService.craeteGroup(this.name, this.typeGroup).subscribe(
        res => {
            console.log(res);
            this.router.navigate(['/groups' , res.groupId]);
        },
        err => {
          alert('Ошибка!');
        }
      );
    }
  }

  addgroup(event : any) {
    let form : FormGroup = event as FormGroup
    console.log("Submit Form")
    form.disable()
  }

}
