import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndividualTeachersEducatorPageRoutingModule } from './individualTeachersEducatorPage-routing.module';
import { IndividualTeachersEducatorPageComponent } from './individualTeachersEducatorPage.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";

import { IndividualTeachersEducatorPageService } from  './individualTeachersEducatorPage.service';

@NgModule({
    imports: [
		CommonModule, 
		IndividualTeachersEducatorPageRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [IndividualTeachersEducatorPageComponent],
	providers: [IndividualTeachersEducatorPageService]
})
export class IndividualTeachersEducatorPageModule {}
