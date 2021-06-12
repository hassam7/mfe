import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IServerResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id: null | string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  getNews() {
    return this.httpClient
      .get<IServerResponse>(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2d8e2e8d06eb426db9ddd34879065b4d`
      )
      .pipe(
        map(response => {
          return response.articles;
        })
      );
  }
}
