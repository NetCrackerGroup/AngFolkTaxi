import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-confirmation',
  templateUrl: './ngbd-modal-confirmation.component.html',
  styleUrls: ['./ngbd-modal-confirmation.component.css']
})
export class NgbdModalConfirmationComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
