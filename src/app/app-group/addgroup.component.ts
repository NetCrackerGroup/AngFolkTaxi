import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-group',
    templateUrl: './addgroup.component.html',
    styleUrls: ['./addgroup.component.css']
})
export class AddGroupComponent implements OnInit {


    closeResult: string;

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }


    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log("close open");
          console.log(this.closeResult);
        }, (reason) => {
            console.log("close opne with btn");
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
}
