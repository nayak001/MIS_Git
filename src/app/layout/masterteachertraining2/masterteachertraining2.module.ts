import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { Masterteachertraining2RoutingModule } from "./masterteachertraining2-routing.module";
import { Masterteachertraining2Component } from "./masterteachertraining2.component";
import { PageHeaderModule } from "./../../shared";
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";

import { Masterteachertraining2Service } from "./masterteachertraining2.service";
@NgModule({
  imports: [
    CommonModule,
    Masterteachertraining2RoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    NgbModule,
  ],
  declarations: [Masterteachertraining2Component],
  providers: [Masterteachertraining2Service],
})
export class Masterteachertraining2Module {}
