import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';


@NgModule({
  declarations: [
    HomeComponent,
    PrivacyPolicyComponent,
    ReturnPolicyComponent,
    TermsAndConditionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutsModule
  ]
})
export class HomeModule { }
