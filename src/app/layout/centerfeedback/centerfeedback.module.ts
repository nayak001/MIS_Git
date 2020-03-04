import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CenterfeedbackRoutingModule } from './centerfeedback-routing.module';
import { CenterfeedbackComponent } from './centerfeedback.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { CenterfeedbackService } from  './centerfeedback.service';

@NgModule({
    imports: [
		CommonModule, 
		CenterfeedbackRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [CenterfeedbackComponent],
	providers: [CenterfeedbackService]
})
export class CenterfeedbackModule {}
