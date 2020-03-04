import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeapgrouptaskRoutingModule } from './leapgrouptask-routing.module';
import { LeapgrouptaskComponent } from './leapgrouptask.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbCarouselModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [LeapgrouptaskComponent],
  imports: [
    CommonModule,
    LeapgrouptaskRoutingModule,
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
export class LeapgrouptaskModule { }
