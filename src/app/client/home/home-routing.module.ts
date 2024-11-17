import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms-and-condition',
    component:TermsAndConditionComponent

  },
  {
    path: 'return-refund-policy',
    component:ReturnPolicyComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
