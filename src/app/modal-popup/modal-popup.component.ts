import { Component, OnInit } from '@angular/core';
import {EmailValidator, NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  private postUser = {
    email: undefined,
    password: undefined
  };



  constructor(private http: HttpClient, ) { }
  display: true;
  url = 'http://localhost:1337';


  ngOnInit() {
  }

  Submited(form: NgForm) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`client:password`)});
    const options = { headers };
    console.log('asdasd');
    this.http.post(this.url + '/users/sign-up', this.postUser, options)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }
}
