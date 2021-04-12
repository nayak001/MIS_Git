import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EceactivitiesRoutingModule } from './eceactivities-routing.module';
import { EceactivitiesComponent } from './eceactivities.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbCarouselModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { EceactivitiesService } from './eceactivities.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSortableModule } from 'ngx-sortable';


@NgModule({
  imports: [
    CommonModule,
    EceactivitiesRoutingModule,
    PageHeaderModule,
    DataTableModule,
    NgbCarouselModule,
    NgbTabsetModule,
    NgxSortableModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule
  ],
  declarations: [EceactivitiesComponent],
  providers: [EceactivitiesService]
})
export class EceactivitiesModule { }
