import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NsdccertService } from "./nsdccert.service";
import { NsdccertComponent } from "./nsdccert.component";
import { nsdccertRoutingModule } from "./nsdccert-routing.module";

import {
  NgbModule,
  NgbCarouselModule,
  NgbTabsetModule,
} from "@ng-bootstrap/ng-bootstrap";
import { PageHeaderModule } from "../../shared";
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";
import { NgxSortableModule } from "ngx-sortable";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  imports: [
    CommonModule,
    nsdccertRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    NgbModule,
    NgbCarouselModule,
    NgbTabsetModule,
    NgxSortableModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [NsdccertComponent],
  providers: [NsdccertService],
})
export class NsdccertModule {}
