import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {  AnganwadimanagerRoutingModule } from './anganwadimanager-routing.module';
import { AnganwadimanagerComponent } from './anganwadimanager.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { AnganwadimanagerService } from  './anganwadimanager.service';

@NgModule({
    imports: [
		CommonModule, 
		AnganwadimanagerRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [AnganwadimanagerComponent],
	providers: [AnganwadimanagerService]
})
export class AnganwadimanagerModule {}
