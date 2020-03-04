import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaymentinfoRoutingModule } from './paymentinfo-routing.module';
import { PaymentinfoComponent } from './paymentinfo.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { PaymentinfoService } from  './paymentinfo.service';

@NgModule({
    imports: [
		CommonModule, 
		PaymentinfoRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [PaymentinfoComponent],
	providers: [PaymentinfoService]
})
export class PaymentinfoModule {}
