import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminEraseDataComponent } from "./adminerasedata.component";

const routes: Routes = [{ path: "", component: AdminEraseDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminErasedataRoutingModule {}
