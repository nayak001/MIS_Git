import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaselinetestComponent } from './baselinetest.component';

const routes: Routes = [
    { path: '', component: BaselinetestComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaselinetestRoutingModule {
}
