import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommunityvisitRoutingModule } from './communityvisit-routing.module';
import { CommunityvisitComponent } from './communityvisit.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

import { CommunityvisitService } from  './communityvisit.service';

@NgModule({
    imports: [
		CommonModule, 
		CommunityvisitRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		ReactiveFormsModule
	],
    declarations: [CommunityvisitComponent],
	providers: [CommunityvisitService]
})
export class CommunityvisitModule {}
