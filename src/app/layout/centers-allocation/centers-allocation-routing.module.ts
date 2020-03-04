import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentersAllocationComponent } from './centers-allocation.component';

const routes: Routes = [
    { path: '', component: CentersAllocationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CentersAllocationRoutingModule {
}
