import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { DailyinfoRoutingModule } from './dailyinfo-routing.module';
import { DailyinfoComponent } from './dailyinfo.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { DailyinfoService } from  './dailyinfo.service';


@NgModule({
    imports: [
		CommonModule, 
		DailyinfoRoutingModule, 
		NgbCarouselModule,
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [DailyinfoComponent],
	providers: [DailyinfoService]
})
export class DailyinfoModule {}
