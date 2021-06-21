import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UdisemanagerRoutingModule } from './udisemanager-routing.module';
import { UdisemanagerComponent } from './udisemanager.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { UdisemanagerService } from  './udisemanager.service';

@NgModule({
    imports: [
		CommonModule, 
		UdisemanagerRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [UdisemanagerComponent],
	providers: [UdisemanagerService]
})
export class UdisemanagerModule {}
