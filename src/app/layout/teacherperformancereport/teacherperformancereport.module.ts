import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeacherperformancereportRoutingModule } from './teacherperformancereport-routing.module';
import { TeacherperformancereportComponent } from './teacherperformancereport.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Teacherreportperformanceservice } from  './teacherperformancereports.service';

@NgModule({
    imports: [
		CommonModule, 
		TeacherperformancereportRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule
	],
    declarations: [TeacherperformancereportComponent],
	providers: [Teacherreportperformanceservice]
})
export class TeacherperformancereportModule {}
