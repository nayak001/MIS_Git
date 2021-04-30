import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomebaseMasterComponent } from './homebasemaster.component';

const routes: Routes = [
    { path: '', component: HomebaseMasterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class homebasedRoutingModule {
}
