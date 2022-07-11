import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { routerTransition } from "../../router.animations";
import { Router, ActivatedRoute } from "@angular/router";
import { PgskillmasterService } from "./pgeskillmaster.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pgskillmaster",
  templateUrl: "./pgeskillmaster.component.html",
  styleUrls: ["./pgeskillmaster.component.scss"],
  animations: [routerTransition()],
})
export class PgskillmasterComponent implements OnInit {
  qp_program: any = "";
  qp_navigatedfrom: any = "";

  modalReference: any;
  closeResult: string;

  record_id: string = "";
  skillset_list: any = [];

  selected_preferedlanguage = "od";
  selected_program: string = "";
  selected_subject: string = "";
  selected_class: string = "";
  selected_skillsetid: string = "";
  selected_skillsetname: string = "";

  hideLoading_indicator: boolean;
  hide_records_panel: boolean = true;
  isSelected: boolean = true;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private pgskillmasterService: PgskillmasterService,
    private modalService: NgbModal
  ) {
    this.route.queryParams.subscribe((params) => {
      this.qp_program = params["program"];
      this.qp_navigatedfrom = params["navigatedfrom"];
    });

    this.qp_program = this.qp_program ? this.qp_program : "pge";
    this.qp_navigatedfrom = this.qp_navigatedfrom
      ? this.qp_navigatedfrom
      : "/pgeactivities";

    this.selected_program = this.qp_program;
    this.selected_preferedlanguage = "";
    this.selected_subject = "";
    this.selected_class = "";

    this.hideLoading_indicator = true;
    this.hide_records_panel = true;
  }

  ngOnInit() {}

  back_buttonclick() {
    this.router.navigate([this.qp_navigatedfrom]);
  }

  preflanguage_select_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_preferedlanguage = selectedOptionValue;
    this.load_record(
      this.selected_preferedlanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class
    );
  }

  subject_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_subject = selectedOptionValue;
    this.load_record(
      this.selected_preferedlanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class
    );
  }

  class_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_class = selectedOptionValue;
    this.load_record(
      this.selected_preferedlanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class
    );
  }

  go_btn_click() {
    this.load_record(
      this.selected_preferedlanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class
    );
  }

  async load_record(
    selected_preferedlanguage,
    selected_program,
    selected_subject,
    selected_class
  ) {
    if (
      selected_preferedlanguage != undefined &&
      selected_preferedlanguage != null &&
      selected_preferedlanguage != "" &&
      selected_program != undefined &&
      selected_program != null &&
      selected_program != "" &&
      selected_subject != undefined &&
      selected_subject != null &&
      selected_subject != "" &&
      selected_class != undefined &&
      selected_class != null &&
      selected_class != ""
    ) {
      this.hideLoading_indicator = false;
      this.hide_records_panel = true;
      this.pgskillmasterService
        .getpgeactivityskills(
          selected_preferedlanguage,
          selected_program,
          selected_subject,
          selected_class
        )
        .subscribe(
          (data) => {
            this.skillset_list = data;
            this.hideLoading_indicator = true;
            this.hide_records_panel = false;
          },
          (error) => {},
          () => {}
        );
    } else {
      this.selected_skillsetname = "";
      this.hideLoading_indicator = true;
      this.hide_records_panel = true;
    }
  }

  async save_record() {
    if (
      this.selected_skillsetname == undefined ||
      this.selected_skillsetname == null ||
      this.selected_skillsetname.trim() == ""
    ) {
      alert("Please add skill");
    } else {
      if (
        this.selected_preferedlanguage != undefined &&
        this.selected_preferedlanguage != null &&
        this.selected_preferedlanguage != "" &&
        this.selected_program != undefined &&
        this.selected_program != null &&
        this.selected_program != "" &&
        this.selected_subject != undefined &&
        this.selected_subject != null &&
        this.selected_subject != "" &&
        this.selected_class != undefined &&
        this.selected_class != null &&
        this.selected_class != ""
      ) {
        const body = {
          preferedlanguage: this.selected_preferedlanguage,
          program: this.selected_program,
          class: this.selected_class,
          subject: this.selected_subject,
          skillsetid: new Date().getTime(),
          skillsetname: this.selected_skillsetname,
        };
        this.pgskillmasterService.createpgeskill(body).subscribe(
          (data) => {
            this.modalReference.close();
            this.load_record(
              this.selected_preferedlanguage,
              this.selected_program,
              this.selected_subject,
              this.selected_class
            );
          },
          (error) => {},
          () => {}
        );
      } else {
        // Something went wrong
      }
    }
  }

  async update_record() {
    if (
      this.selected_skillsetname == undefined ||
      this.selected_skillsetname == null ||
      this.selected_skillsetname.trim() == ""
    ) {
      alert("Please add pge skill content");
    } else {
      const body = {
        skillsetname: this.selected_skillsetname,
      };
      this.pgskillmasterService
        .updatepgeskillmaster(this.record_id, body)
        .subscribe(
          (data) => {
            this.pgskillmasterService
              .updatemasterpgeactivitiesbyskillsetid(
                this.selected_skillsetid,
                body
              )
              .subscribe(
                (data) => {
                  this.modalReference.close();
                  this.load_record(
                    this.selected_preferedlanguage,
                    this.selected_program,
                    this.selected_subject,
                    this.selected_class
                  );
                },
                (error) => {},
                () => {}
              );
          },
          (error) => {},
          () => {}
        );
    }
  }

  async delete_record() {
    this.pgskillmasterService.deletetpgeskill(this.record_id).subscribe(
      (data) => {
        this.pgskillmasterService
          .deletemasterpgeactivitiesbyskillsetid(this.selected_skillsetid)
          .subscribe(
            (data) => {
              this.modalReference.close();
              this.load_record(
                this.selected_preferedlanguage,
                this.selected_program,
                this.selected_subject,
                this.selected_class
              );
            },
            (error) => {},
            () => {}
          );
      },
      (error) => {},
      () => {}
    );
  }

  open(content, flag, obj) {
    if (flag == "add") {
      this.record_id = "";
      this.selected_skillsetid = "";
      this.selected_skillsetname = "";
    } else if (flag == "edit") {
      this.record_id = obj._id;
      this.selected_skillsetid = obj.skillsetid;
      this.selected_skillsetname = obj.skillsetname;
    } else if (flag == "delete") {
      this.record_id = obj._id;
      this.selected_skillsetid = obj.skillsetid;
      this.selected_skillsetname = obj.skillsetname;
    }

    this.modalReference = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
    });
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
