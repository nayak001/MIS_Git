import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TzworkshopcontentComponent } from './tzworkshopcontent.component';

const routes: Routes = [
    { path: '', component: TzworkshopcontentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TzworkshopcontentRoutingModule {
}
