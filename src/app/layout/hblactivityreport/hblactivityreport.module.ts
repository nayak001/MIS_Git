import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HblactivityreportRoutingModule } from './hblactivityreport-routing.module';
import { HblactivityreportComponent } from './hblactivityreport.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { HblactivityreportService } from  './hblactivityreport.service';

@NgModule({
    imports: [
		NgbModule,
		CommonModule, 
		HblactivityreportRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule
	],
    declarations: [HblactivityreportComponent],
	providers: [HblactivityreportService]
})
export class HblactivityreportModule {}
