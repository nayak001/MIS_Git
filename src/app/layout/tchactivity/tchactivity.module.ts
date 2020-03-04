import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TchactivityRoutingModule } from './tchactivity-routing.module';
import { TchactivityComponent } from './tchactivity.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { TchactivityService } from  './tchactivity.service';

@NgModule({
    imports: [
		CommonModule, 
		TchactivityRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [TchactivityComponent],
	providers: [TchactivityService]
})
export class TchactivityModule {}
