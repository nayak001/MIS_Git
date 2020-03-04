import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CentersAllocationRoutingModule } from './centers-allocation-routing.module';
import { CentersAllocationComponent } from './centers-allocation.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { CentersAllocationService } from  './centers-allocation.service';

@NgModule({
    imports: [
		CommonModule, 
		CentersAllocationRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [CentersAllocationComponent],
	providers: [CentersAllocationService]
})
export class CentersAllocationModule {}
