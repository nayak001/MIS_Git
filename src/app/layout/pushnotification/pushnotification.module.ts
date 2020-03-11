import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PushnotificationRoutingModule } from './pushnotification-routing.module';
import { PushnotificationComponent } from './pushnotification.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PushnotificationService } from  './pushnotification.service';

@NgModule({
    imports: [
		CommonModule, 
		PushnotificationRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule
	],
    declarations: [PushnotificationComponent],
	providers: [PushnotificationService]
})
export class PushnotificationModule {}
