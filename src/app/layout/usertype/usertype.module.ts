import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsertypeRoutingModule } from './usertype-routing.module';
import { UsertypeComponent } from './usertype.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { UsertypeService } from  './usertype.service';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
    imports: [
		CommonModule,
    UsertypeRoutingModule,
		PageHeaderModule,
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		DatePickerModule
	],
    declarations: [UsertypeComponent],
	providers: [UsertypeService]
})
export class UsertypeModule {}
