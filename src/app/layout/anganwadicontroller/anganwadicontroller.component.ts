import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
@Component({
  selector: 'app-anganwadicontroller',
  templateUrl: './anganwadicontroller.component.html',
  styleUrls: ['./anganwadicontroller.component.scss'],
  animations: [routerTransition()],
})
export class AnganwadicontrollerComponent implements OnInit {
  flag: string = "";
  no_record_selected: boolean = false;
  modalReference: any;
  closeResult: string;
  hideLoading_indicator: boolean = true;
  constructor(
    private modalService: NgbModal,
    public router: Router,
  ) { }

  ngOnInit() {
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
