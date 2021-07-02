import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UdisemanagerComponent } from './udisemanager.component';

const routes: Routes = [
    { path: '', component: UdisemanagerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UdisemanagerRoutingModule {
}
