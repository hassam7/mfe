import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { StockDetailRoutingModule } from './stock-detail-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StockDetailComponent } from './stock-detail.component';

@NgModule({
  declarations: [StockDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    StockDetailRoutingModule,
    NgZorroAntdModule,
    RouterModule
  ]
})
export class StockDetailModule {}
