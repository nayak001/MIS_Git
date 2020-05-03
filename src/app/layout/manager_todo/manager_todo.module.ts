import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Manager_todoRoutingModule } from './manager_todo-routing.module';
import { Manager_todoComponent } from './manager_todo.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { Manager_todoService } from  './manager_todo.service';

@NgModule({
    imports: [
		CommonModule, 
		Manager_todoRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		AutocompleteLibModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [Manager_todoComponent],
	providers: [Manager_todoService]
})
export class Manager_todoModule {}
