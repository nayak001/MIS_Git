import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TchassessmentRoutingModule } from './tchassessment-routing.module';
import { TchassessmentComponent } from './tchassessment.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { TchassessmentService } from  './tchassessment.service';

// auto-complete
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
		CommonModule, 
		TchassessmentRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule
	],
    declarations: [TchassessmentComponent],
	providers: [TchassessmentService]
})
export class TchassessmentModule {}
