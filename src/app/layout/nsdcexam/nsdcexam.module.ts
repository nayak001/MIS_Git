import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { nsdcexamRoutingModule } from "./nsdcexam-routing.module";
import { NsdcExamComponent } from "./nsdcexam.component";
import { PageHeaderModule } from "../../shared";
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";

import { NsdcExamService } from "./nsdcexam.service";
@NgModule({
  imports: [
    CommonModule,
    nsdcexamRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    NgbModule,
  ],
  declarations: [NsdcExamComponent],
  providers: [NsdcExamService],
})
export class NsdcExamModule {}
