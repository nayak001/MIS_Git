import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndividualTeachersEducatorPageRoutingModule } from './individualTeachersEducatorPage-routing.module';
import { IndividualTeachersEducatorPageComponent } from './individualTeachersEducatorPage.component';
import { PageHeaderModule } from '../../shared';
import { DataTableModule } from "angular-6-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndividualTeachersEducatorPageService } from  './individualTeachersEducatorPage.service';

@NgModule({
    imports: [
		CommonModule, 
		IndividualTeachersEducatorPageRoutingModule, 
		PageHeaderModule, 
		DataTableModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule
	],
    declarations: [IndividualTeachersEducatorPageComponent],
	providers: [IndividualTeachersEducatorPageService]
})
export class IndividualTeachersEducatorPageModule {}
