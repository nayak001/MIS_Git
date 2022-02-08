import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MasterNsdcComponent } from "./masternsdcmodule.component";

const routes: Routes = [{ path: "", component: MasterNsdcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class nsdcmasterRoutingModule {}
