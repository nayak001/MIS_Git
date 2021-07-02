import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PgeskillmasterRoutingModule } from './pgeskillmaster-routing.module';
import { PgskillmasterComponent } from './pgeskillmaster.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { PgskillmasterService } from  './pgeskillmaster.service';

@NgModule({
    imports: [
		CommonModule, 
		PgeskillmasterRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [PgskillmasterComponent],
	providers: [PgskillmasterService]
})
export class pgskillmasterModule {}
