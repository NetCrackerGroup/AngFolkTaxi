import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from '../services/http-client.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../services/auth.service';
import {TempSetrService} from '../tempServices/temp-setr.service';


@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css'],
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
              private authServ: AuthService,
              private tempSetrService: TempSetrService) {
    this.form = form;
    this.myHttpClient = myHttpClient;

  }

  url = 'http://localhost:1337';
  visibility = false;

  ngOnInit() {
  }

  Submited(form: NgForm) {
    console.log( this.loginComponent);
    this.router.navigate(['login']);
    this.tempSetrService.someEvent({email: this.postUser.email, password: this.postUser.password});
    this.form = form;
    this.visibility = false;
    /////////////////
    ////////////////////////////////
    ////////////////////////////////////////////
    /////////////////////////////////////////////////////привести в нормальный вид
    const resp =  this.myHttpClient.authPost(this.url + '/users/sign-up', this.postUser);
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
  doThis() {
    console.log('doThis');
    this.router.navigate(['login']);

    this.visibility = false;

    this.tempSetrService.someEvent({email: this.postUser.email, password: this.postUser.password});
  }



  OpenPopup() {
    this.visibility = true;
  }

  toggle() {
    this.visibility = false;
  }
}
