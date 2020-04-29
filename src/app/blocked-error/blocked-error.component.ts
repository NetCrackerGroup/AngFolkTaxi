import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-blocked-error',
  templateUrl: './blocked-error.component.html',
  styleUrls: ['./blocked-error.component.css']
})
export class BlockedErrorComponent implements OnInit {

  visibility = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggle() {
    this.visibility = false;
  }
  OpenPopup() {
    this.visibility = true;
  }

}
