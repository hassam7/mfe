import { Component, Output, EventEmitter } from '@angular/core';
import { StockSymbolSearchService } from 'src/app/services/stock-symbol-search.service';

import debounce from 'lodash.debounce';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent {
  public search: (term: string) => void = debounce(this._search, 600);
  @Output() symbolSelected = new EventEmitter<string>();
  public selectedValue = null;
  public listOfOption: Array<{ symbol: string; name: string }> = [];
  constructor(private stockSymbolSearchService: StockSymbolSearchService) {}

  public valueSelected(event: string): void {
    this.symbolSelected.emit(event);
  }

  private _search(value: string): void {
    this.stockSymbolSearchService.get(value).subscribe(result => {
      this.listOfOption = result;
    });
  }
}
