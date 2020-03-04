import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentdetailsRoutingModule } from './studentdetails-routing.module';
import { StudentdetailsComponent } from './studentdetails.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { StudentdetailsService } from  './studentdetails.service';

@NgModule({
    imports: [
		CommonModule, 
		StudentdetailsRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [StudentdetailsComponent],
	providers: [StudentdetailsService]
})
export class StudentdetailsModule {}
