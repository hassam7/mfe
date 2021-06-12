import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { apiKey } from '../const/constants';

export interface ILosingStocks {
  mostLoserStock: StockItem[];
}

export interface IGainingStocks {
  mostGainerStock: StockItem[];
}

export interface IActiveStocks {
  mostActiveStock: StockItem[];
}

export interface StockItem {
  ticker: string;
  changes: number;
  price: string;
  changesPercentage: string;
  companyName: string;
}

@Injectable({ providedIn: 'root' })
export class StockCardService {
  private activeEndpoint = `https://financialmodelingprep.com/api/v3/stock/actives?apikey=${apiKey}`;
  private gainersEndpoint = `https://financialmodelingprep.com/api/v3/stock/gainers?apikey=${apiKey}`;
  private losersEndpoint = `https://financialmodelingprep.com/api/v3/stock/losers?apikey=${apiKey}`;

  constructor(private httpClient: HttpClient) {}

  public getActiveStockDetails() {
    return this.httpClient
      .get<IActiveStocks>(this.activeEndpoint)
      .pipe(
        map(activeStock => this.formatResponse(activeStock.mostActiveStock))
      );
  }

  public getGainingStockDetails() {
    return this.httpClient
      .get<IGainingStocks>(this.gainersEndpoint)
      .pipe(
        map(gainingStock => this.formatResponse(gainingStock.mostGainerStock))
      );
  }

  public getLosingStockDetails() {
    return this.httpClient
      .get<ILosingStocks>(this.losersEndpoint)
      .pipe(
        map(losingStock => this.formatResponse(losingStock.mostLoserStock))
      );
  }

  private formatResponse(stockData: StockItem[]) {
    return stockData.map(stockItem => ({
      ...stockItem,
      changesPercentage: this.removeRoundBrackers(stockItem.changesPercentage)
    }));
  }

  private removeRoundBrackers(text: string) {
    return text.replace('(', '').replace(')', '');
  }
}
