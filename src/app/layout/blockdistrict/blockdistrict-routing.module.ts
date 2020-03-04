import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockdistrictComponent } from './blockdistrict.component';

const routes: Routes = [
    { path: '', component: BlockdistrictComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlockdistrictRoutingModule {
}
