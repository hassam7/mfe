import { Component, OnInit, Input } from '@angular/core';
import {
  StockCardService,
  StockItem
} from 'src/app/services/stock-card.service';
import { Observable } from 'rxjs';

type ValidValues = 'active' | 'gainer' | 'loser';

@Component({
  selector: 'stock-card',
  templateUrl: 'stock-card.component.html',
  styleUrls: ['stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  public stockData: StockItem[];
  public isLoading = true;
  @Input() public type: ValidValues;
  constructor(private stockCard: StockCardService) {}

  ngOnInit() {
    const inputPassed = this.type;
    let data$: undefined | Observable<StockItem[]>;
    if (inputPassed === 'active')
      data$ = this.stockCard.getActiveStockDetails();
    else if (inputPassed === 'gainer')
      data$ = this.stockCard.getGainingStockDetails();
    else if (inputPassed === 'loser')
      data$ = this.stockCard.getLosingStockDetails();

    if (data$) {
      data$.subscribe(stockData => {
        this.stockData = stockData.slice(0, 5);
        this.isLoading = false;
      });
    }
  }

  public isPositive(text: string): boolean {
    if (typeof text !== 'string') return true;
    return text.startsWith('+');
  }

  public isNegative(text: string): boolean {
    if (typeof text !== 'string') return true;
    return text.startsWith('-');
  }
}
