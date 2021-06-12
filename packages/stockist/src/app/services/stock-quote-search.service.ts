import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { apiKey } from '../const/constants';

type IServerResponse = Array<IStockQuote>;

export interface IStockQuote {
  symbol: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exhange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class StockQuoteSearchService {
  constructor(private httpClient: HttpClient) {}

  getQuote(symbol: string) {
    return this.httpClient
      .get<IServerResponse>(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
      )
      .pipe(map(response => response[0]));
  }
}
