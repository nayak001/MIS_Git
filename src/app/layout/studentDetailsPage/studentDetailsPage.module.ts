import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentDetailsPageRoutingModule } from './studentDetailsPage-routing.module';
import { StudentDetailsPageComponent } from './studentDetailsPage.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";

import { StudentDetailsPageService } from  './studentDetailsPage.service';

@NgModule({
    imports: [
		CommonModule, 
		StudentDetailsPageRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [StudentDetailsPageComponent],
	providers: [StudentDetailsPageService]
})
export class StudentDetailsPageModule {}
