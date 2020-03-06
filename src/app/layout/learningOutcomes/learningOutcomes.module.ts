import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LearningOutcomesRoutingModule } from './learningOutcomes-routing.module';
import { LearningOutcomesComponent } from './learningOutcomes.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";

import { LearningOutcomesService } from  './learningOutcomes.service';

@NgModule({
    imports: [
		CommonModule, 
		LearningOutcomesRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [LearningOutcomesComponent],
	providers: [LearningOutcomesService]
})
export class LearningOutcomesModule {}
