import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../services/auth.service';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
})

export class ModalPopupComponent implements OnInit {

  postUser = {
    email: undefined,
    password: undefined,
    phoneNumber: undefined,
    cityId: undefined,
    name: undefined
    };
  //form: NgForm;


  constructor(private http: HttpClient,
              //form: NgForm,
              private router: Router,
              //private loginComponent: LoginComponent,
              private authServ: AuthService,
              private tempSetrService: TempSetrService) {
    //this.form = form;

  }

  //visibility = false;
  url = environment.devUrl;

  ngOnInit() {
  }

  Submited(form: NgForm) {
    console.log(this.postUser);
    this.http.post(this.url + '/users/sign-up', this.postUser).subscribe((resp) => {
      this.authServ.login(this.postUser.email, this.postUser.password);
      //this.visibility = false;
      this.router.navigate(['/']);
    });

  }

  Registrate(){
      console.log(this.postUser);
      this.http.post(this.url + '/users/sign-up', this.postUser).subscribe((resp) => {
        this.authServ.login(this.postUser.email, this.postUser.password);
        this.router.navigate(['/']);
      });
  }


 /*OpenPopup() {
    this.visibility = true;
  }

  toggle() {
    this.visibility = false;
  }*/
}
