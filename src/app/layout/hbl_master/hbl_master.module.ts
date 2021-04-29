import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { hblmasterRoutingModule } from './hbl_master-routing.module';
import { hblmasterComponenet } from './hbl_master.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { hblMasterService } from  './hbl_master.service';
@NgModule({
    imports: [
		CommonModule, 
		hblmasterRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
	],
    declarations: [hblmasterComponenet],
	providers: [hblMasterService]
})
export class hblmasterRoutingModule1 {}
