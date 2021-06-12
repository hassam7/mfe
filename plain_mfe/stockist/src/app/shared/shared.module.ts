import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { StockCardComponent } from './stock-card/stock-card.component';
import { StockSearchComponent } from './stock-search/stock-search.component';
import { StockGraphMiniComponent } from './stock-graph/stock-graph-mini/stock-graph-mini.component';
import { LoginComponent } from './login/login.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { RecentlyViewedStocksComponent } from './recently-viewed-stocks/recently-viewed-stocks';

const COMPONENTS = [
  StockCardComponent,
  StockSearchComponent,
  StockGraphMiniComponent,
  LoginComponent,
  NewsCardComponent,
  RecentlyViewedStocksComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [...COMPONENTS, NgZorroAntdModule]
})
export class SharedModule {}
