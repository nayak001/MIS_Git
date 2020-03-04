import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssessmentinfoRoutingModule } from './assessmentinfo-routing.module';
import { AssessmentinfoComponent } from './assessmentinfo.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { AssessmentinfoService } from  './assessmentinfo.service';

@NgModule({
    imports: [
		CommonModule, 
		AssessmentinfoRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [AssessmentinfoComponent],
	providers: [AssessmentinfoService]
})
export class AssessmentinfoModule {}
