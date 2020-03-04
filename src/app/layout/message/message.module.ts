import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { MessageService } from  './message.service';


@NgModule({
    imports: [
		CommonModule,
    MessageRoutingModule,
		PageHeaderModule,
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [MessageComponent],
	providers: [MessageService]
})
export class MessageModule {}
