import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolgrouptaskRoutingModule } from './schoolgrouptask-routing.module';
import { SchoolgrouptaskComponent } from './schoolgrouptask.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbCarouselModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [SchoolgrouptaskComponent],
  imports: [
    CommonModule,
    SchoolgrouptaskRoutingModule,
    PageHeaderModule,
    DataTableModule,
    NgbCarouselModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule
  ]
})
export class SchoolgrouptaskModule { }
