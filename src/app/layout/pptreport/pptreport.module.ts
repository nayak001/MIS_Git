import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PptreportRoutingModule } from './pptreport-routing.module';
import { PptreportComponent } from './pptreport.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PptreportService } from  './pptreport.service';

@NgModule({
    imports: [
		NgbModule,
		CommonModule, 
		PptreportRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule
	],
    declarations: [PptreportComponent],
	providers: [PptreportService]
})
export class PptreportModule {}
