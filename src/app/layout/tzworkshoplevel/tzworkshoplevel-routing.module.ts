import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TzworkshoplevelComponent } from './tzworkshoplevel.component';

const routes: Routes = [
    { path: '', component: TzworkshoplevelComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TzworkshoplevelRoutingModule {
}
