import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { StockCardService } from './services/stock-card.service';
import { StockSymbolSearchService } from './services/stock-symbol-search.service';
import { CompanyProfileService } from './services/company-profile.service';
import { StockQuoteSearchService } from './services/stock-quote-search.service';
import { StockHistoricalPriceService } from './services/stock-historical-price.service';
import { NewsService } from './services/news.service';
import { RecentlyViewedStocksService } from './services/recently-viewed-stocks.service';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';

registerLocaleData(en);

const PROVIDERS = [
  StockCardService,
  StockSymbolSearchService,
  CompanyProfileService,
  StockQuoteSearchService,
  StockHistoricalPriceService,
  NewsService,
  RecentlyViewedStocksService
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    HomeModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ...PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
