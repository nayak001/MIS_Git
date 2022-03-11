import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NsdcComponent } from "./nsdc.component";

const routes: Routes = [{ path: "", component: NsdcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class nsdcRoutingModule {}
