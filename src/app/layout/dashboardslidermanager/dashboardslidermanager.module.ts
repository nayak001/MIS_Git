import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardslidermanagerRoutingModule } from './dashboardslidermanager-routing.module';
import { DashboardslidermanagerComponent } from './dashboardslidermanager.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { DashboardslidermanagerService } from  './dashboardslidermanager.service';

@NgModule({
    imports: [
		CommonModule, 
		DashboardslidermanagerRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [DashboardslidermanagerComponent],
	providers: [DashboardslidermanagerService]
})
export class DashboardslidermanagerModule {}
