import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { apiKey } from '../const/constants';

export interface IServerResponse {
  symbol: string;
  profile: ICompanyProfile;
}

export interface ICompanyProfile {
  symbol: string;
  price: number;
  beta: string;
  volAvg: string;
  mktCap: string;
  lastDiv: string;
  range: string;
  changes: number;
  changesPercentage: string;
  companyName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CompanyProfileService {
  constructor(private httpClient: HttpClient) {}

  public getCompanyProfile(
    companyName: string
  ): Observable<ICompanyProfile | null> {
    return this.httpClient
      .get<IServerResponse>(
        `https://financialmodelingprep.com/api/v3/company/profile/${companyName}?apikey=${apiKey}`
      )
      .pipe(
        map(response => {
          return { ...response.profile, symbol: response.symbol } || null;
        })
      );
  }
}
