import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterteacherassesmentComponent } from './masterteacherassesment.component';

const routes: Routes = [
    { path: '', component: MasterteacherassesmentComponent  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterteacherassesmentRoutingModule {
}
