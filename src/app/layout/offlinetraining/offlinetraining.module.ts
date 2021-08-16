import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { offlinetrainingRoutingModule } from './offlinetraining-routing.module';
import { offlinetrainingComponent } from './offlinetraining.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { offlinetrainingService } from  './offlinetraining.service';
@NgModule({
    imports: [
		CommonModule, 
		offlinetrainingRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
	],
    declarations: [offlinetrainingComponent],
	providers: [offlinetrainingService]
})
export class OfflinetrainingModule {}
