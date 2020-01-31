import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from '../http-client.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
  providers: [LoginComponent]
})

export class ModalPopupComponent implements OnInit {

  private postUser = {
    email: undefined,
    password: undefined,
    phoneNumber: undefined,
    cityId: undefined,
    name: undefined
    };
  form: NgForm;


  constructor(private http: HttpClient,
              form: NgForm,
              private myHttpClient: HttpClientService,
              private router: Router,
              private loginComponent: LoginComponent,
              private authServ: AuthService) {
    this.form = form;
    this.myHttpClient = myHttpClient;
  }

  url = 'http://localhost:1337';
  visibility = false;

  ngOnInit() {
  }

  Submited(form: NgForm) {
    console.log( this.loginComponent);
    this.form = form;
    this.router.navigate(['login']);
    this.myHttpClient.post(this.url + '/users/sign-up', this.postUser).subscribe((resp: any) => {
      console.log(resp);
    });
    this.authServ.login(this.postUser.email, this.postUser.password);

    // console.log(form.value);
    // const headers = new HttpHeaders({
    //   Authorization: 'Basic ' + btoa(`client:password`)});
    // const options = { headers };
    // console.log('asdasd');
    // this.http.post(this.url + '/users/sign-up', this.postUser, options)
    //   .subscribe((resp: any) => {
    //     console.log(resp);
    //   });
  }

  OpenPopup() {
    this.visibility = true;
  }

  toggle() {
    this.visibility = false;
  }
}
