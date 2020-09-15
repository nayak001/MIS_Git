import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PgeactivitiesRoutingModule } from './pgeactivities-routing.module';
import { PgeactivitiesComponent } from './pgeactivities.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbCarouselModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { PgeactivitiesService } from './pgeactivities.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSortableModule } from 'ngx-sortable';


@NgModule({
  imports: [
    CommonModule,
    PgeactivitiesRoutingModule,
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
  declarations: [PgeactivitiesComponent],
  providers: [PgeactivitiesService]
})
export class PgeactivitiesModule { }
