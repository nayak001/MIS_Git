import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FlnmasterRoutingModule } from "./flnmaster-routing.module";
import { FlnMasterComponent } from "./flnmaster.component";
import { PageHeaderModule } from "../../shared";
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";

import { FlnService } from "./flnmaster.service";
@NgModule({
  imports: [
    CommonModule,
    FlnmasterRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    NgbModule,
  ],
  declarations: [FlnMasterComponent],
  providers: [FlnService],
})
export class FlnmasterModule {}
