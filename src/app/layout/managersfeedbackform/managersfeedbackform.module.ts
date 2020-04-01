import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagersfeedbackformRoutingModule } from './managersfeedbackform-routing.module';
import { ManagersfeedbackformComponent } from './managersfeedbackform.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { ManagersfeedbackformService } from  './managersfeedbackform.service';

@NgModule({
    imports: [
		CommonModule, 
		ManagersfeedbackformRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [ManagersfeedbackformComponent],
	providers: [ManagersfeedbackformService]
})
export class ManagersfeedbackformModule {}
