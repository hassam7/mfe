import { Component, OnInit } from '@angular/core';
import { RecentlyViewedStocksService } from 'src/app/services/recently-viewed-stocks.service';

@Component({
  selector: 'app-recently-viewed-stocks',
  templateUrl: 'recently-viewed-stocks.html',
  styleUrls: ['recently-viewed-stocks.scss']
})
export class RecentlyViewedStocksComponent implements OnInit {
  public get recentlyViewedStocks(): string[] {
    return this.recentlyViewedStocksService.getRecentlyViewedStocks(5);
  }

  constructor(
    public recentlyViewedStocksService: RecentlyViewedStocksService
  ) {}

  ngOnInit(): void {}
}
