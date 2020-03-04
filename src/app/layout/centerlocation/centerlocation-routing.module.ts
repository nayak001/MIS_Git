import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterlocationComponent } from './centerlocation.component';

const routes: Routes = [
    { path: '', component: CenterlocationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CenterlocationRoutingModule {
}
