import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WhatsappbotRoutingModule } from "./whatsappbot-routing.module";
import { WhatsappbotComponent } from "./whatsappbot.component";
import { PageHeaderModule } from "./../../shared";
import { DataTableModule } from "angular-6-datatable";

import { WhatsappbotService } from "./whatsappbot.service";

@NgModule({
  imports: [
    CommonModule,
    WhatsappbotRoutingModule,
    PageHeaderModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [WhatsappbotComponent],
  providers: [WhatsappbotService],
})
export class WhatsappbotModule {}
