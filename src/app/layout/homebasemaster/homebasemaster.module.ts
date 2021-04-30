import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { homebasedRoutingModule } from './homebasemaster-routing.module';
import { HomebaseMasterComponent } from './homebasemaster.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { TeacherbaselineService } from  './homebasemaster.service';
@NgModule({
    imports: [
		CommonModule, 
		homebasedRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
	],
    declarations: [HomebaseMasterComponent],
	providers: [TeacherbaselineService]
})
export class TeacherBaselineModule {}
