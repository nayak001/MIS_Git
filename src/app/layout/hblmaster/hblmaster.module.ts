import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HblmasterRoutingModule } from './hblmaster-routing.module';
import { HblmasterComponent } from './hblmaster.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HblmasterService } from  './hblmaster.service';

@NgModule({
    imports: [
		NgbModule,
		CommonModule, 
		HblmasterRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [HblmasterComponent],
	providers: [HblmasterService]
})
export class HblmasterModule {}
