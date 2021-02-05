import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SurveyReportRoutingModule } from './surveyReport-routing.module';
import { SurveyReportComponent } from './surveyReport.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SurveyReportService } from  './surveyReport.service';

@NgModule({
    imports: [
		CommonModule, 
		SurveyReportRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule
	],
    declarations: [SurveyReportComponent],
	providers: [SurveyReportService]
})
export class  SurveyReportModule {}
