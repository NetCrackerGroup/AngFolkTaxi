import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-change-name',
  templateUrl: './acc-change-name.component.html',
  styleUrls: ['./acc-change-name.component.css']
})
export class AccChangeNameComponent implements OnInit {


  @Output() newNameEvent = new EventEmitter<string>();

  visibility = false;
  newName : string = '';
  form : NgForm;
  numLock : number = 50;

  constructor(private userService : UserService,
              form: NgForm,
              private router : Router) {
     this.form = form;
  }

  Submited(form: NgForm) {
    console.log('you are changing your name');
    if ( this.newName.trim().length == 0) {
      alert("Заполните поле \"Имя\" ");
    }
    else{
      console.log(`new name: ${this.newName}`);
      this.userService.updateUserFio(this.newName);
      this.visibility = false;
      this.numLock = 50;
      this.newNameEvent.emit(this.newName);
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
  }

  OpenPopup(name : string) {
    this.newName = name;
    this.numLock -= name.length;
    this.visibility = true;
  }

  onInput(){
    this.numLock = 50 - this.newName.length;
  }

  onKeydown() {
    this.numLock = 50 - this.newName.length;
  }

  toggle() {
    this.visibility = false;
    this.numLock = 50;
  }

}
