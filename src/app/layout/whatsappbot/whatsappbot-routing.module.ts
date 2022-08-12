import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WhatsappbotComponent } from "./whatsappbot.component";

const routes: Routes = [{ path: "", component: WhatsappbotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsappbotRoutingModule {}
