import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndividualUserPageRoutingModule } from './individualUserPage-routing.module';
import { IndividualUserPageComponent } from './individualUserPage.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";

import { IndividualUserPageService } from  './individualUserPage.service';

@NgModule({
    imports: [
		CommonModule, 
		IndividualUserPageRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [IndividualUserPageComponent],
	providers: [IndividualUserPageService]
})
export class IndividualUserPageModule {}
