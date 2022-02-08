import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { nsdcmasterRoutingModule } from "./masternsdcmodule-routing.module";
import { MasterNsdcComponent } from "./masternsdcmodule.component";
import { PageHeaderModule } from "../../shared";
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";

import { MasterNsdcService } from "./masternsdcmodule.service";
@NgModule({
  imports: [
    CommonModule,
    nsdcmasterRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    NgbModule,
  ],
  declarations: [MasterNsdcComponent],
  providers: [MasterNsdcService],
})
export class MasterNsdcModule {}
