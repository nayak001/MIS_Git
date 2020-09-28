import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MasterteacherassesmentRoutingModule } from './masterteacherassesment-routing.module';
import { MasterteacherassesmentComponent } from './masterteacherassesment.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { MasterteacherassesmentService } from  './masterteacherassesment.service';
@NgModule({
    imports: [
		CommonModule, 
		MasterteacherassesmentRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
	],
    declarations: [MasterteacherassesmentComponent],
	providers: [MasterteacherassesmentService]
})
export class Masterteachertraining2Module {}
