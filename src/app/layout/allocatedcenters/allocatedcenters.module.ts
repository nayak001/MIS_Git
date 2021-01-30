import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AllocatedcentersRoutingModule } from './allocatedcenters-routing.module';
import { AllocatedcentersComponent } from './allocatedcenters.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { AllocatedcentersService } from  './allocatedcenters.service';

@NgModule({
    imports: [
		CommonModule, 
		AllocatedcentersRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [AllocatedcentersComponent],
	providers: [AllocatedcentersService]
})
export class AllocatedcentersModule {}
