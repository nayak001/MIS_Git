import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkillchartfileuploadRoutingModule } from './skillchartfileupload-routing.module';
import { SkillchartfileuploadComponent } from './skillchartfileupload.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { SkillchartfileuploadService } from  './skillchartfileupload.service';

// auto-complete
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
		CommonModule, 
		SkillchartfileuploadRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule
	],
    declarations: [SkillchartfileuploadComponent],
	providers: [SkillchartfileuploadService]
})
export class SkillchartfileuploadModule {}
