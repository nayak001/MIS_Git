import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserswapRoutingModule } from "../userswap/userswap-routing.module";
import { UserswapComponent } from "./userswap.component";

import { PageHeaderModule } from "./../../shared";
import { DataTableModule } from "angular-6-datatable";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxCroppieModule } from "ngx-croppie";

import { UserswapService } from "./userswap.service";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    UserswapRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgxCroppieModule,
  ],
  declarations: [UserswapComponent],
  providers: [UserswapService],
})
export class UserswapModule {}
