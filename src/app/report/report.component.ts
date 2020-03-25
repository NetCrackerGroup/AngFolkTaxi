import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  form: NgForm;

  visibility = false;

  reportReason : string = "";
  reportText : string = "";
  driverId : number;

  constructor(private http: HttpClient,
              form: NgForm,
              private router: Router,
              private userService : UserService) {

    this.form = form
  }

  ngOnInit() {
  }

  Submited(form: NgForm) {
     if ( this.reportReason.trim().length == 0) {
      alert("Заполните поле \"reportReason\" ");
     }
     else if ( this.reportText.trim().length == 0) {
      alert("Заполните поле \"reportText\" ");
     }
     else {
      this.userService.createNewReport(this.driverId, this.reportReason, this.reportText);
      this.visibility = false;
     }

  }

  OpenPopup(driverId : number) {
    this.driverId = driverId
    this.visibility = true;
  }

  toggle() {
    this.visibility = false;
  }

}
