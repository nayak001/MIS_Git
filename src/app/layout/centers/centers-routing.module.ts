import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentersComponent } from './centers.component';

const routes: Routes = [
    { path: '', component: CentersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CentersRoutingModule {
}
