import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Mastermanagertraining1RoutingModule } from './mastermanagertraining1-routing.module';
import { Mastermanagertraining1Component } from './mastermanagertraining1.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { Mastermanagertraining1Service } from  './mastermanagertraining1.service';

@NgModule({
    imports: [
		CommonModule, 
		Mastermanagertraining1RoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule
	],
    declarations: [Mastermanagertraining1Component],
	providers: [Mastermanagertraining1Service]
})
export class Mastermanagertraining1Module {}
