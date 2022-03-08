import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminErasedataRoutingModule } from "./adminerasedata-routing.module";
import { AdminEraseDataComponent } from "./adminerasedata.component";
import { PageHeaderModule } from "../../shared";
import { DataTableModule } from "angular-6-datatable";
import { NgbCarouselModule, NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminEraseDataService } from "./adminerasedata.service";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    AdminErasedataRoutingModule,
    PageHeaderModule,
    DataTableModule,
    NgbCarouselModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule,
  ],
  declarations: [AdminEraseDataComponent],
  providers: [AdminEraseDataService],
})
export class AdminerasedataModule {}
