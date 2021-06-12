import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { apiKey } from '../const/constants';

interface IServerResponse {
  symbol: string;
  historical: IHistoricalData[];
}

export interface IHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

@Injectable({ providedIn: 'root' })
export class StockHistoricalPriceService {
  constructor(private httpClient: HttpClient) {}

  public get(symbol: string): Observable<IHistoricalData[]> {
    return this.httpClient
      .get<IServerResponse>(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`
      )
      .pipe(map(serverResponse => serverResponse.historical));
  }
}
