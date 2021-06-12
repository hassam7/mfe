import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockDetailComponent } from './stock-detail.component';

const routes: Routes = [
  {
    path: '',
    // Add Component if user does not select any qutoe
    children: [
      {
        path: ':symbol',
        component: StockDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockDetailRoutingModule {}
