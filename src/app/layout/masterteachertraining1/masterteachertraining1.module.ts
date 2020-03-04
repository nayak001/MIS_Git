import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Masterteachertraining1RoutingModule } from './masterteachertraining1-routing.module';
import { Masterteachertraining1Component } from './masterteachertraining1.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { Masterteachertraining1Service } from  './masterteachertraining1.service';

@NgModule({
    imports: [
		CommonModule, 
		Masterteachertraining1RoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [Masterteachertraining1Component],
	providers: [Masterteachertraining1Service]
})
export class Masterteachertraining1Module {}
