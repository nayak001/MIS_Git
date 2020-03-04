import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MgroperationsComponent } from './mgroperations.component';

const routes: Routes = [
    { path: '', component: MgroperationsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MgroperationsRoutingModule {
}
