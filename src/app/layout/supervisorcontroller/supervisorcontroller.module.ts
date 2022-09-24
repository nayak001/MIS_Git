import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SupervisorcontrollerRoutingModule } from "./supervisorcontroller-routing.module";
import { SupervisorcontrollerComponent } from "./supervisorcontroller.component";
import { SupervisorcontrollerService } from "./supervisorcontroler.service";

@NgModule({
  imports: [CommonModule, SupervisorcontrollerRoutingModule],
  declarations: [SupervisorcontrollerComponent],
  providers: [SupervisorcontrollerService],
})
export class SupervisorcontrollerModule {}
