import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { UsersService } from  './users.service';


import { NgxCroppieModule } from 'ngx-croppie';




@NgModule({
    imports: [
		CommonModule, 
		UsersRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule,
		AutocompleteLibModule,
		NgxCroppieModule
	],
    declarations: [UsersComponent],
	providers: [UsersService]
})
export class UsersModule {}
