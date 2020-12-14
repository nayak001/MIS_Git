import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersregistrationpageRoutingModule } from './usersregistrationpage-routing.module';
import { UsersregistrationpageComponent } from './usersregistrationpage.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UsersregistrationpageService } from  './usersregistrationpage.service';

//import { NgxCroppieModule } from 'ngx-croppie';
//import { CustomImageFormControlComponent } from './../custom-image-form-control/custom-image-form-control.component';

import { NgxCroppieModule } from './../modules/ngx-croppie/ngx-croppie.module';

@NgModule({
    imports: [
		CommonModule, 
		UsersregistrationpageRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule,
		NgxCroppieModule,
		NgMultiSelectDropDownModule
	],
    declarations: [UsersregistrationpageComponent],
	providers: [UsersregistrationpageService]
})
export class UsersregistrationpageModule {}
