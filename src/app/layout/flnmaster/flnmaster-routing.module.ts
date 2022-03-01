import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlnMasterComponent } from "./flnmaster.component";

const routes: Routes = [{ path: "", component: FlnMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlnmasterRoutingModule {}
