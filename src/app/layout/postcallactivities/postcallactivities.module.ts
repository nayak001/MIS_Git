import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostcallactivitiesRoutingModule } from './postcallactivities-routing.module';
import { PostcallactivitiesComponent } from './postcallactivities.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbCarouselModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { PostcallactivitiesService } from './postcallactivities.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    PostcallactivitiesRoutingModule,
    PageHeaderModule,
    DataTableModule,
    NgbCarouselModule,
    NgbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FileUploadModule
  ],
  declarations: [PostcallactivitiesComponent],
  providers: [PostcallactivitiesService]
})
export class PostcallactivitiesModule { }
