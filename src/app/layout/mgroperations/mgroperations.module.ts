import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { MgroperationsRoutingModule } from './mgroperations-routing.module';
import { MgroperationsComponent } from './mgroperations.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { MgroperationsService } from  './mgroperations.service';


@NgModule({
    imports: [
		CommonModule, 
		MgroperationsRoutingModule, 
		NgbCarouselModule,
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [MgroperationsComponent],
	providers: [MgroperationsService]
})
export class MgroperationsModule {}
