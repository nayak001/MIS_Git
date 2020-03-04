import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersessionRoutingModule } from './usersession-routing.module';
import { UsersessionComponent } from './usersession.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { UsersessionService } from  './usersession.service';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
    imports: [
		CommonModule,
    UsersessionRoutingModule,
		PageHeaderModule,
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		DatePickerModule
	],
    declarations: [UsersessionComponent],
	providers: [UsersessionService]
})
export class UsersessionModule {}
