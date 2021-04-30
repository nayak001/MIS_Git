import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hblmasterComponenet } from './hbl_master.component';

const routes: Routes = [
    { path: '', component: hblmasterComponenet }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class hblmasterRoutingModule {
}
