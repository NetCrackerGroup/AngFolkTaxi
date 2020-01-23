import {Component, ViewChild} from '@angular/core';
import {AuthService} from './auth.service';
import {ModalPopupComponent} from './modal-popup/modal-popup.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngFolkTaxi';
  authService: AuthService;

  @ViewChild(ModalPopupComponent, {static: false})
  private modalPopupComponent: ModalPopupComponent;

  constructor(authService: AuthService) {
    this.authService = authService;

  }
}
