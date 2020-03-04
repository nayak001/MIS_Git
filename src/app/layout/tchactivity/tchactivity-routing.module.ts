import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TchactivityComponent } from './tchactivity.component';

const routes: Routes = [
    { path: '', component: TchactivityComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TchactivityRoutingModule {
}
