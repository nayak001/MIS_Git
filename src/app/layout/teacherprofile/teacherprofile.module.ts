import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeacherprofileRoutingModule } from './teacherprofile-routing.module';
import { TeacherprofileComponent } from './teacherprofile.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

import { TeacherprofileService } from  './teacherprofile.service';
@NgModule({
    imports: [
		CommonModule, 
		TeacherprofileRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		DatePickerModule
	],
    declarations: [TeacherprofileComponent],
	providers: [TeacherprofileService]
})
export class TeacherprofileModule {}
