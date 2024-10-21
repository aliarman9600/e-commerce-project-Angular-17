import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
  ]
})
export class SharedModule { }
