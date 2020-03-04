import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { AttendanceService } from  './attendance.service';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
    imports: [
		CommonModule, 
		AttendanceRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		DatePickerModule
	],
    declarations: [AttendanceComponent],
	providers: [AttendanceService]
})
export class AttendanceModule {}
