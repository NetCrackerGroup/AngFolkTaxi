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
   modalPopupComponent: ModalPopupComponent;

  @ViewChild(LoginComponent, {static: false})
   loginComponent: LoginComponent;

   tempSetrService: TempSetrService;
   http: HttpClient;
   authService: AuthService;


  constructor(private  groupService: GroupsService, routeService: RoutesService, authService: AuthService,
              tempSetrService: TempSetrService, http: HttpClient,
              loginComponent: LoginComponent) {
    this.loginComponent = loginComponent;
    this.authService = authService;
    this.tempSetrService = tempSetrService;
    this.http = http;
    this.routeService = routeService;

  }

  ngOnInit() {
    console.log('navigationOnInit');
    // this.change2.subscribe((tempUser) => {
    //   this.visibility = true;
    //   this.email = tempUser.email;
    //   this.password = tempUser.password;
    // });
    if (this.isReg()) {
      // Нужно переделать под конкретный id пользователя
      // this.groupService.getUserGroups('alex@alex.com').subscribe(
      //   res => {
      //     this.listGroups = res;
      //   },
      //   err => {
      //     // alert(`Error , ${err}`);
      //   }
      // );

      this.routeService.getDriverRoutes().subscribe(
        res => {
          console.log(res);
          this.listDriverRoutes = res;
        },
        err => {
           // alert(`Error , ${err}`);
        }
      );
    }

  }
  isReg(): boolean {
    return true;
  }

}
