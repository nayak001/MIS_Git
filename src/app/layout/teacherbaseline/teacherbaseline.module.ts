import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { teacherbaselineRoutingModule } from './teacherbaseline-routing.module';
import { TeacherbaselineComponent } from './teacherbaseline.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { TeacherbaselineService } from  './teacherbaseline.service';
@NgModule({
    imports: [
		CommonModule, 
		teacherbaselineRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
	],
    declarations: [TeacherbaselineComponent],
	providers: [TeacherbaselineService]
})
export class TeacherBaselineModule {}
