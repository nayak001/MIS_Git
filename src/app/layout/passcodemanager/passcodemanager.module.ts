import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasscodemanagerRoutingModule } from './passcodemanager-routing.module';
import { PasscodemanagerComponent } from './passcodemanager.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { PasscodemanagerService } from  './passcodemanager.service';

@NgModule({
    imports: [
		CommonModule, 
		PasscodemanagerRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [PasscodemanagerComponent],
	providers: [PasscodemanagerService]
})
export class PasscodemanagerModule {}
