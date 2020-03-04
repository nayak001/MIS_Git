import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TzworkshopcontentRoutingModule } from './tzworkshopcontent-routing.module';
import { TzworkshopcontentComponent } from './tzworkshopcontent.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { TzworkshopcontentService } from  './tzworkshopcontent.service';

@NgModule({
    imports: [
		CommonModule, 
		TzworkshopcontentRoutingModule, 
		PageHeaderModule, 
		CKEditorModule,
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [TzworkshopcontentComponent],
	providers: [TzworkshopcontentService]
})
export class TzworkshopcontentModule {}
