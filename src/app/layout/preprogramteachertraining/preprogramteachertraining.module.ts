import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PreprogramteachertrainingRoutingModule } from './preprogramteachertraining-routing.module';
import { PreprogrmateachertrainingComponent } from './preprogramteachertraining.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { PreprogramteachertrainingService } from  './preprogramteachertraining.service';
@NgModule({
    imports: [
		CommonModule, 
		PreprogramteachertrainingRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
	],
    declarations: [PreprogrmateachertrainingComponent],
	providers: [PreprogramteachertrainingService]
})
export class PreprgrameTeacherTrainingModule {}
