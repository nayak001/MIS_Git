import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterimageComponent } from './centerimage.component';

const routes: Routes = [
    { path: '', component: CenterimageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CenterimageRoutingModule {
}
