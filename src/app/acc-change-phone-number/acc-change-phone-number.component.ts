import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { NgControl, ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { Subscription} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-acc-change-phone-number',
  templateUrl: './acc-change-phone-number.component.html',
  styleUrls: ['./acc-change-phone-number.component.css']
})

export class AccChangePhoneNumberComponent implements OnInit {

  visibility = false;
  newPhoneNumber : string = "";
  form : NgForm;
  numLock : number;

  constructor(private userService : UserService,
             form: NgForm,
             private router : Router) {
     this.form = form;
  }


  Submited(form: NgForm) {
    console.log('you are changing your phone number');
    if ( this.newPhoneNumber.trim().length == 0) {
      alert("Заполните поле \"телефонный номер\" ");
    }
    else if ( this.newPhoneNumber.match( /(^|(\+))(\d+)$/g ) == null ){
      alert("Неверный формат ввода номера");
    }
    else {
      this.userService.updateUserPhoneNumber(this.newPhoneNumber);
      this.visibility = false;
    }
  }

  ngOnInit() {
  }

  OpenPopup(phoneNumber : string) {
    this.newPhoneNumber = phoneNumber;
    this.numLock = 20 - phoneNumber.length;
    this.visibility = true;
  }

  onInput(){
    this.numLock = 20 - this.newPhoneNumber.length;
  }

  onKeydown() {
    this.numLock = 20 - this.newPhoneNumber.length;
  }

  toggle() {
    this.visibility = false;
  }

}
