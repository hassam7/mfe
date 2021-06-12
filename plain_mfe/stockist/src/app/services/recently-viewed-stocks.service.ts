import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecentlyViewedStocksService {
  private recentlyViewedStocks: string[] = [];
  constructor() {}

  public addNewStock(stockSymbol: string) {
    this.recentlyViewedStocks.unshift(stockSymbol);
  }

  public getRecentlyViewedStocks(limit: number) {
    if (limit) return this.recentlyViewedStocks.slice(0, limit);
    return this.recentlyViewedStocks;
  }
}
