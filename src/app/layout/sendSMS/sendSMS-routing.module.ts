import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendSMSComponent } from './sendSMS.component';

const routes: Routes = [
    { path: '', component: SendSMSComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SendSMSRoutingModule {
}
