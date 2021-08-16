import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { offlinetrainingComponent } from './offlinetraining.component';

const routes: Routes = [
    { path: '', component: offlinetrainingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class offlinetrainingRoutingModule {
}
