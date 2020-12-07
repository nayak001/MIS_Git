import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HblmasterComponent } from './hblmaster.component';

const routes: Routes = [
    { path: '', component: HblmasterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HblmasterRoutingModule {
}
