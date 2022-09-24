import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SupervisorcontrollerComponent } from "./supervisorcontroller.component";

const routes: Routes = [{ path: "", component: SupervisorcontrollerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorcontrollerRoutingModule {}
