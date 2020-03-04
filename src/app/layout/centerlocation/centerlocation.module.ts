import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { CenterlocationRoutingModule } from './centerlocation-routing.module';
import { CenterlocationComponent } from './centerlocation.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { CenterlocationService } from  './centerlocation.service';

@NgModule({
    imports: [
		CommonModule, 
		CenterlocationRoutingModule, 
		NgbCarouselModule,
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [CenterlocationComponent],
	providers: [CenterlocationService]
})
export class CenterlocationModule {}
