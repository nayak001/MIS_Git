import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TchbaselineRoutingModule } from './tchbaseline-routing.module';
import { TchbaselineComponent } from './tchbaseline.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { TchbaselineService } from  './tchbaseline.service';

// auto-complete
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
		CommonModule, 
		TchbaselineRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule
	],
    declarations: [TchbaselineComponent],
	providers: [TchbaselineService]
})
export class TchbaselineModule {}
