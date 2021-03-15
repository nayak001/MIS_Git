import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreprogrameTrainingRoutingModule } from './preprogramtrainingmodules-routing.module';
import { PreprogramTrainingComponent } from './preprogramtrainingmodules.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { PreprogramtrainingService } from  './preprogramtrainingmodules.service';

@NgModule({
    imports: [
		CommonModule, 
		PreprogrameTrainingRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [PreprogramTrainingComponent],
	providers: [PreprogramtrainingService]
})
export class PreprogramtrainingModule {}
