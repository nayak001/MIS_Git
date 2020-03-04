import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssessmentmasterRoutingModule } from './assessmentmaster-routing.module';
import { AssessmentmasterComponent } from './assessmentmaster.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { AssessmentmasterService } from  './assessmentmaster.service';

@NgModule({
    imports: [
		CommonModule, 
		AssessmentmasterRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [AssessmentmasterComponent],
	providers: [AssessmentmasterService]
})
export class AssessmentmasterModule {}
