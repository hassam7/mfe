import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey } from '../const/constants';

export interface ISymbolInfo {
  symbol: string;
  name: null | string;
  currency: null | string;
  stockExchange: null | string;
  exchangeShortName: string;
}

@Injectable({ providedIn: 'root' })
export class StockSymbolSearchService {
  constructor(private httpClient: HttpClient) {}

  public get(value: string): Observable<ISymbolInfo[]> {
    return this.httpClient.get<ISymbolInfo[]>(
      `https://financialmodelingprep.com/api/v3/search?query=${value}&limit=10&exchange=NASDAQ?apikey=${apiKey}`
    );
  }
}
