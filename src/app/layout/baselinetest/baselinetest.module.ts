import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaselinetestRoutingModule } from './baselinetest-routing.module';
import { BaselinetestComponent } from './baselinetest.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { BaselinetestService } from  './baselinetest.service';

@NgModule({
    imports: [
		CommonModule, 
		BaselinetestRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [BaselinetestComponent],
	providers: [BaselinetestService]
})
export class BaselinetestModule {}
