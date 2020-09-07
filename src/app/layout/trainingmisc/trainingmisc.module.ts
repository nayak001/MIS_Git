import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrainingMiscRoutingModule } from './trainingmisc-routing.module';
import { TrainingMiscComponent } from './trainingmisc.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";

import { TrainingmiscService } from  './trainingmisc.service';

@NgModule({
    imports: [
		CommonModule, 
		TrainingMiscRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [TrainingMiscComponent],
	providers: [TrainingmiscService]
})
export class TrainingMiscModule {}
