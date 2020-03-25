import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupsService } from '../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-create',
  templateUrl: './app-create.component.html',
  styleUrls: ['./app-create.component.css']
})
export class AppCreateComponent implements OnInit {
  
  groupExists : Boolean;
  
  name : String = "";
  typeGroup : String = "";
  @Output() close = new EventEmitter<boolean>();
  @Input() modal : any;

  constructor( private groupsService : GroupsService,
              private router: Router) { }

  ngOnInit() {
    
    this.groupExists = false;

  }


  submit(event){
    console.log("Submit form!")
    if ( this.name.trim().length == 0) {
      alert("Заполните поле \"Название\" ");
    }
    else if (this.typeGroup.trim().length == 0)
    {
      alert("Выберите тип группы!");
    }
    else {
      this.groupsService.createGroup(this.name.toString(), this.typeGroup.toString()).subscribe(
        (res) => {
            if (res["group_id"] != null) {
              console.log(res);
              this.router.navigate([`/groups/${res["group_id"]}`]);
              this.modal.close("close");
            }
            else {
              this.groupExists = true;
            }
        },
        err => {
        }
      );
    }
  }

  
  addgroup(event: any) {
    const form: FormGroup = event as FormGroup;
    console.log('Submit Form');
    form.disable();
  }

}
