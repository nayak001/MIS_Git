import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SurveymasterRoutingModule } from './surveymaster-routing.module';
import { SurveymasterComponent } from './surveymaster.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { SurveymasterService } from  './surveymaster.service';

@NgModule({
    imports: [
		CommonModule, 
		SurveymasterRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [SurveymasterComponent],
	providers: [SurveymasterService]
})
export class SurveymasterModule {}
