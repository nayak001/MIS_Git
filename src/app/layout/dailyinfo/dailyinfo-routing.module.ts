import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyinfoComponent } from './dailyinfo.component';

const routes: Routes = [
    { path: '', component: DailyinfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DailyinfoRoutingModule {
}
