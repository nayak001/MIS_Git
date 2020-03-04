import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { CenterimageRoutingModule } from './centerimage-routing.module';
import { CenterimageComponent } from './centerimage.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { CenterimageService } from  './centerimage.service';

@NgModule({
    imports: [
		CommonModule, 
		CenterimageRoutingModule, 
		NgbCarouselModule,
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [CenterimageComponent],
	providers: [CenterimageService]
})
export class CenterimageModule {}
