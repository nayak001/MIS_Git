import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserfeedbackRoutingModule } from './userfeedback-routing.module';
import { UserfeedbackComponent } from './userfeedback.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { UserfeedbackService } from  './userfeedback.service';


@NgModule({
    imports: [
		CommonModule,
    UserfeedbackRoutingModule,
		PageHeaderModule,
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [UserfeedbackComponent],
	providers: [UserfeedbackService]
})
export class UserfeedbackModule {}
