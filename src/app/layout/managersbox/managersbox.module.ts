import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagersboxRoutingModule } from './managersbox-routing.module';
import { ManagersboxComponent } from './managersbox.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { ManagersboxService } from  './managersbox.service';

// auto-complete
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
		CommonModule, 
		ManagersboxRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule
	],
    declarations: [ManagersboxComponent],
	providers: [ManagersboxService]
})
export class ManagersboxModule {}
