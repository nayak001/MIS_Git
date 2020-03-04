import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TzworkshoplevelRoutingModule } from './tzworkshoplevel-routing.module';
import { TzworkshoplevelComponent } from './tzworkshoplevel.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { TzworkshoplevelService } from  './tzworkshoplevel.service';

@NgModule({
    imports: [
		CommonModule, 
		TzworkshoplevelRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [TzworkshoplevelComponent],
	providers: [TzworkshoplevelService]
})
export class TzworkshoplevelModule {}
