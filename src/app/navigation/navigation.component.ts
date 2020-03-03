import {Component, OnInit, ViewChild} from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {IGroup} from '../entities/igroup';
import {IRoute} from '../entities/iroute';
import {RoutesService} from '../services/routes.service';
import {ModalPopupComponent} from '../modal-popup/modal-popup.component';
import {LoginComponent} from '../login/login.component';
import {TempSetrService} from '../tempServices/temp-setr.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  listGroups: IGroup[] = null;
  listDriverRoutes: IRoute[] = null;
  url = 'http://localhost:1337';

  private routeService: RoutesService;
  @ViewChild(ModalPopupComponent, {static: false})
  private modalPopupComponent: ModalPopupComponent;

  @ViewChild(LoginComponent, {static: false})
  private loginComponent: LoginComponent;

  private tempSetrService: TempSetrService;
  private http: HttpClient;
  private authService: AuthService;
  private userService: UserService;

  private userEmail: string = null;

  constructor(private  groupService: GroupsService, routeService: RoutesService, authService: AuthService,
              tempSetrService: TempSetrService, http: HttpClient,
              loginComponent: LoginComponent, userService: UserService) {
    this.loginComponent = loginComponent;
    this.authService = authService;
    this.tempSetrService = tempSetrService;
    this.http = http;
    this.routeService = routeService;
    this.userService = userService;
  }

  ngOnInit() {
    if (this.isReg()) {
      // Нужно переделать под конкретный id пользователя
      this.groupService.getUserGroups(this.userEmail).subscribe(
        res => {
          this.listGroups = res;
        },
        err => {
          alert(`Error , ${err}`);
        }
      );

      this.routeService.getDriverRoutes(this.userEmail).subscribe(
        res => {
          this.listDriverRoutes = res;
        },
        err => {
           alert(`Error , ${err}`);
        }
      );
    }

  }
  getUs() {
    this.http.get(`${this.url}/users/helloUser`).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getAdmin() {
    this.http.get(`${this.url}/users/Admin`).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getUser() {
    this.http.get(`${this.url}/users/User`).subscribe((resp: any) => {
      console.log(resp);
    });
  }

  isReg(): boolean {
   /* this.http.get(`${this.url}/users/getUserEmail`).subscribe(
      res => {
        if (res != null) {
          this.userEmail = res.toString();
        }
      },
      err => {
        alert(`Error , ${err}`);
      }
    );
    return this.userEmail != null;
    */
   return false;
  }

}
