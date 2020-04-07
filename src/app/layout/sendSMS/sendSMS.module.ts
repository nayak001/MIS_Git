import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SendSMSRoutingModule } from './sendSMS-routing.module';
import { SendSMSComponent } from './sendSMS.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SendSMSService } from  './sendSMS.service';

@NgModule({
    imports: [
		CommonModule, 
		SendSMSRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule
	],
    declarations: [SendSMSComponent],
	providers: [SendSMSService]
})
export class SendSMSModule {}
