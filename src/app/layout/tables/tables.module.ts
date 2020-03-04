import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { DataTableModule } from "angular-6-datatable";

@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, DataTableModule],
    declarations: [TablesComponent]
})
export class TablesModule {}
