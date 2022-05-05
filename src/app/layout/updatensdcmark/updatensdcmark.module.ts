import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { UpdatensdcmarkRoutingModule } from "./updatensdcmark-routing.module";
import { UpdatensdcmarkComponent } from "./updatensdcmark.component";
import { PageHeaderModule } from "../../shared";
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";
import { UpdatensdcmarkService } from "./updatensdcmark.service";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  imports: [
    CommonModule,
    UpdatensdcmarkRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
    NgbModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [UpdatensdcmarkComponent],
  providers: [UpdatensdcmarkService],
})
export class UpdatensdcmarkModule {}
