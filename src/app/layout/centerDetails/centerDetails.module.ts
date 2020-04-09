import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './centerDetails-routing.module';
import { CenterDetailsComponent } from './centerDetails.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CenterDetailsService } from  './centerDetails.service';

@NgModule({
    imports: [
		CommonModule, 
		UsersRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule
	],
    declarations: [CenterDetailsComponent],
	providers: [CenterDetailsService]
})
export class  CenterDetailsModule {}
