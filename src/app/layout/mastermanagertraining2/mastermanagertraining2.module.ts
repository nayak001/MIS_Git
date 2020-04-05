import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Mastermanagertraining2RoutingModule } from './mastermanagertraining2-routing.module';
import { Mastermanagertraining2Component } from './mastermanagertraining2.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';


import { Mastermanagertraining2Service } from  './mastermanagertraining2.service';
@NgModule({
    imports: [
		CommonModule, 
		Mastermanagertraining2RoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		FileUploadModule
	],
    declarations: [Mastermanagertraining2Component],
	providers: [Mastermanagertraining2Service]
})
export class Mastermanagertraining2Module {}
