import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { supervisorcontrollerRoutingModule } from './supervisorcontroller-routing.module';
import { SupervisorcontrollerComponent } from './supervisorcontroller.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { SupervisorcontrollerService } from  './supervisorcontroller.service';

@NgModule({
 
  imports: [
    CommonModule,
    supervisorcontrollerRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule,
		NgbModule
  ],
  declarations: [SupervisorcontrollerComponent],
	providers: [SupervisorcontrollerService]
})
export class SupervisorcontrollerModule { }
