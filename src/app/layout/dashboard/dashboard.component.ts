import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [routerTransition()],
})
export class DashboardComponent implements OnInit {
  ngbModalOptions: NgbModalOptions = {
    backdrop: "static",
    keyboard: false,
  };
  modalReference: any;
  closeResult: string;
  modal_title: string = "Show Details";

  public sliders: Array<any> = [];
  public data: any;
  public details_list: any = [];
  param: string = "";

  hideLoading_indicator: boolean = true;
  hideModalLoading_indicator: boolean = true;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService
  ) {}

  async ngOnInit() {
    this.hideLoading_indicator = true;
    this.hideModalLoading_indicator = true;
    //this.initialize_slider();
    await this.getAllDashboardData();
  }

  getAllDashboardData() {
    this.hideLoading_indicator = false;
    this.dashboardService.getallstudents().subscribe((data) => {
      this.data = data;
      this.hideLoading_indicator = true;
    });
  }

  getDetails(apiurl) {
    this.hideModalLoading_indicator = false;
    this.dashboardService.getdashboarddetails(apiurl).subscribe((data) => {
      if (Object.keys(data).length > 0) {
        this.details_list = data;
      }
      this.hideModalLoading_indicator = true;
    });
  }

  open(content, param) {
    this.param = param;
    this.details_list = [];
    if (param == "allusers") {
      this.modal_title = "All Users";
      this.getDetails("dboard_getallusers");
    } else if (param == "allmanagers") {
      this.modal_title = "All Managers";
      this.getDetails("dboard_getallmanagers");
    } else if (param == "allcenters") {
      this.modal_title = "All Centers";
      this.getDetails("dboard_getallcenters");
    } else if (param == "allanganwadis") {
      this.modal_title = "All Anganwadis";
      this.getDetails("dboard_getallanganwadis");
    } else if (param == "allschools") {
      this.modal_title = "All Schools";
      this.getDetails("dboard_getallschools");
    } else if (param == "allfellows") {
      this.modal_title = "All Fellows";
      this.getDetails("dboard_getallfellows");
    } else if (param == "allstudents") {
      this.modal_title = "All Students";
      this.getDetails("dboard_getallstudents");
    } else if (param == "allgirls") {
      this.modal_title = "All Girl Students";
      this.getDetails("dboard_getallgirlstudents");
    } else if (param == "allece") {
      this.modal_title = "All ECE Students";
      this.getDetails("dboard_getallecestudents");
    } else if (param == "allpge") {
      this.modal_title = "All PGE Students";
      this.getDetails("dboard_getallpgestudents");
    }

    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
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

  initialize_slider() {
    this.sliders.push(
      {
        imagePath: "assets/images/banner1.jpg",
        label: "ThinkZone Vision",
        text: "The work we do at ThinkZone is unique because we are developing a tech-based pedagogy for first generation learners and empowering women entrepreneurs who come from a limited education backgrounds with facilitation skills to provide tech-driven quality education in rural India,” said Binayak Acharya, Founder, ThinkZone.",
      },
      {
        imagePath: "assets/images/banner2.jpg",
        label: "Our Moto",
        text: 'Orientation workshop for our new batch of field associates.ThinkZone"s field associates all happen to be young #women who are ever so passionate to be a part of our journey of creating a positive change in the final mile #education delivery at the Bottom of the Pyramid.',
      },
      {
        imagePath: "assets/images/banner3.jpg",
        label: "Nobel Service",
        text: "The prospect of ThinkZone empowering women entrepreneurs as teachers to impart quality education using innovative low cost and scalable technology which can potentially benefit nearly 2 million students in the next five years is outlined as the rationale behind Gray Matters Capital",
      }
    );
  }
}
