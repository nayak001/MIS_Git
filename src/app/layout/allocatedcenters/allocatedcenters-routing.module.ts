import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllocatedcentersComponent } from './allocatedcenters.component';

const routes: Routes = [
    { path: '', component: AllocatedcentersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllocatedcentersRoutingModule {
}
