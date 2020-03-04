import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlockdistrictRoutingModule } from './blockdistrict-routing.module';
import { BlockdistrictComponent } from './blockdistrict.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from 'angular-6-datatable';

import { BlockdistrictService } from './blockdistrict.service';

@NgModule({
    imports: [
		CommonModule,
		BlockdistrictRoutingModule,
		PageHeaderModule,
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [BlockdistrictComponent],
	providers: [BlockdistrictService]
})
export class BlockdistrictModule {}
