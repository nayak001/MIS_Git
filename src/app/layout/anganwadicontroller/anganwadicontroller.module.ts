import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AnganwadicontrollerRoutingModule } from "./anganwadicontroller-routing.module";
import { AnganwadicontrollerComponent } from "./anganwadicontroller.component";
import { PageHeaderModule } from "./../../shared";
import { DataTableModule } from "angular-6-datatable";

import { AnganwadicontrollerService } from "./anganwadicontroller.service";

@NgModule({
  imports: [
    CommonModule,
    AnganwadicontrollerRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AnganwadicontrollerComponent],
  providers: [AnganwadicontrollerService],
})
export class AnganwadicontrollerModule {}
