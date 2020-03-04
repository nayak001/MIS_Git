import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VersionmanagerRoutingModule } from './versionmanager-routing.module';
import { VersionmanagerComponent } from './versionmanager.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { VersionmanagerService } from  './versionmanager.service';

@NgModule({
    imports: [
		CommonModule, 
		VersionmanagerRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [VersionmanagerComponent],
	providers: [VersionmanagerService]
})
export class VersionmanagerModule {}
