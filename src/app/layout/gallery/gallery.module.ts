import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { GalleryService } from  './gallery.service';

// auto-complete
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
		CommonModule, 
		GalleryRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		NgbTabsetModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule
	],
    declarations: [GalleryComponent],
	providers: [GalleryService]
})
export class GalleryModule {}
