import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersregistrationRoutingModule } from './usersregistration-routing.module';
import { UsersregistrationComponent } from './usersregistration.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { UsersregistrationService } from  './usersregistration.service';

//import { NgxCroppieModule } from 'ngx-croppie';
//import { CustomImageFormControlComponent } from './../custom-image-form-control/custom-image-form-control.component';

import { NgxCroppieModule } from './../modules/ngx-croppie/ngx-croppie.module';

@NgModule({
    imports: [
		CommonModule, 
		UsersregistrationRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule,
		NgxCroppieModule
	],
    declarations: [UsersregistrationComponent],
	providers: [UsersregistrationService]
})
export class UsersregistrationModule {}
