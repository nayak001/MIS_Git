import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentinfoComponent } from './paymentinfo.component';

const routes: Routes = [
    { path: '', component: PaymentinfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentinfoRoutingModule {
}
