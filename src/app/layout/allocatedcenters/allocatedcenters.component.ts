import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router, NavigationExtras } from "@angular/router";
import swal from "sweetalert2";
import { AllocatedcentersService } from "./allocatedcenters.service";

@Component({
  selector: "app-allocatedcenters",
  templateUrl: "./allocatedcenters.component.html",
  styleUrls: ["./allocatedcenters.component.scss"],
  animations: [routerTransition()],
})
export class AllocatedcentersComponent implements OnInit {
  // Data
  all_data: any = [];
  public filterData: any = [];

  // Modal
  modalReference: any;
  closeResult: string;

  // Loading indicator
  hideLoading_indicator: boolean;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private allocatedcentersService: AllocatedcentersService
  ) {}

  ngOnInit() {
    this.hideLoading_indicator = true;
    this.pageLoadProcess();
  }

  pageLoadProcess() {
    this.hideLoading_indicator = false;
    this.allocatedcentersService.allocatedcenter_getalldetails().subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          let result_array: any = [];
          result_array = data;
          this.all_data = result_array.filter(
            (element) =>
              Object.keys(element._id).length > 0 &&
              element._id.managerid.length > 0
          );
          this.filterData = this.all_data;
        }
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  search(term: string) {
    if (!term) {
      this.filterData = this.all_data;
    } else {
      this.filterData = this.all_data.filter((element) =>
        element._id.managername
          .trim()
          .toLowerCase()
          .includes(term.trim().toLowerCase())
      );
    }
  }

  modify_center_btn_click(centerdetail) {
    swal
      .fire({
        title: "Modify Center?",
        text: "Do you want to modify this Center?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.value) {
          this.modify_center(centerdetail);
        }
      });
  }

  modify_center(centerdetails) {
    let userid = centerdetails.userid;
    let navigationExtras: NavigationExtras;
    if (userid == undefined || userid == null || userid.trim().length <= 0) {
      swal.fire("Info", "Error: Teacher not found.", "warning");
    } else {
      navigationExtras = {
        queryParams: {
          action: "edit_user",
          userid: userid,
        },
      };
    }
    //this.router.navigate(["/usersregistration"], navigationExtras);
    this.router.navigate(["/usersregistrationpage"], navigationExtras);
  }

  open(content, centerallot) {
    if (centerallot != undefined || centerallot != null) {
    } else {
    }
    this.modalReference = this.modalService.open(content, centerallot);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
