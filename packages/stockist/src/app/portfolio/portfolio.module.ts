import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';

@NgModule({
  declarations: [PortfolioComponent, PortfolioDetailComponent],
  imports: [CommonModule, PortfolioRoutingModule, NgZorroAntdModule]
})
export class PortfolioModule {}
