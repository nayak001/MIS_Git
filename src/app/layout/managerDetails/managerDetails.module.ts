import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagerDetailsRoutingModule } from './managerDetails-routing.module';
import { ManagerDetailsComponent } from './managerDetails.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ManagerDetailsService } from  './managerDetails.service';

@NgModule({
    imports: [
		CommonModule, 
		ManagerDetailsRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule
	],
    declarations: [ManagerDetailsComponent],
	providers: [ManagerDetailsService]
})
export class ManagerDetailsModule {}
