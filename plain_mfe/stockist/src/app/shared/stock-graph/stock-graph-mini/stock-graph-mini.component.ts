// @ts-nocheck
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { select, mouse } from 'd3-selection';
import { line } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';
import { max, min, bisector } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { IHistoricalData } from 'src/app/services/stock-historical-price.service';

export interface ISelectedData {
  date: Date;
  open: number;
  close: number;
  high: number;
  volume: number;
}

@Component({
  selector: 'app-stock-graph-mini',
  templateUrl: 'stock-graph-mini.component.html',
  styleUrls: ['stock-graph-mini.component.scss']
})
export class StockGraphMiniComponent implements OnChanges {
  @Input() stockData: IHistoricalData;
  @Output() dataSelected = new EventEmitter<ISelectedData>();
  private nativeElement: HTMLDivElement;
  constructor(elem: ElementRef) {
    this.nativeElement = elem.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stockData && !changes.stockData.isFirstChange()) {
      this.redraw();
    }
  }

  public redraw() {
    const firstChild = this.nativeElement.querySelector('svg').firstChild;
    if (firstChild) firstChild.remove();
    this.draw();
  }

  private draw() {
    const dataSet = this.stockData;
    const w = this.nativeElement.offsetWidth;
    const h = this.nativeElement.offsetHeight;
    const padding = 40;
    const svgElement = this.nativeElement.querySelector('svg');

    const formatTime = timeFormat('%x');
    const dataset = dataSet.map(d => {
      return {
        date: new Date(d.date),
        open: +d.open,
        high: +d.high,
        close: +d.close,
        volume: +d.volume
      };
    });

    const xScale = scaleTime()
      .domain([min(dataset, d => d.date), max(dataset, d => d.date)])
      .range([padding, w]);

    const yScale = scaleLinear()
      .domain([0, max(dataset, d => d.close)])
      .range([h - padding, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickFormat(formatTime);

    const yAxis = axisLeft(yScale).ticks(10);

    const lineCb = line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close));

    const bisectDate = bisector(d => d.date).left;
    const that = this;

    const svg = select(svgElement)
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .append('path')
      .datum(dataset)
      .attr('class', 'line')
      .attr('d', lineCb);

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis);

    let horizontalLine;
    let verticalLine;

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('circle').attr('r', 3);

    focus
      .append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 22)
      .attr('x', 10)
      .attr('y', -15)
      .attr('rx', 4)
      .attr('ry', 4);

    focus
      .append('text')
      .attr('x', 18)
      .attr('y', 0)
      .text('Close:');

    focus
      .append('text')
      .attr('class', 'closing')
      .attr('x', 55)
      .attr('y', 0);

    svg
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', w)
      .attr('height', h)
      .on('mouseover', () => {
        focus.style('display', null);
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
      })
      .on('mousemove', mousemove)
      .on('click', function() {
        const x0 = xScale.invert(mouse(this)[0]);
        const i = bisectDate(dataset, x0, 1);
        const d0 = dataset[i - 1];
        const d1 = dataset[i];
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        that.dataSelected.emit({
          date: d.date,
          open: d.open,
          close: d.close,
          high: d.high,
          volume: d.volume
        });
      });

    function mousemove() {
      const x0 = xScale.invert(mouse(this)[0]);
      const i = bisectDate(dataset, x0, 1);
      const d0 = dataset[i - 1];
      const d1 = dataset[i];
      const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr(
        'transform',
        'translate(' + xScale(d.date) + ',' + yScale(d.close) + ')'
      );
      focus.select('.closing').text(d.close);
      horizontalLine.attr('transform', `translate(0, ${yScale(d.close)})`);
      verticalLine.attr('transform', `translate(${xScale(d.date) - 40}, 0)`);
      horizontalLine.style('display', null);
      verticalLine.style('display', null);
    }
    horizontalLine = svg
      .append('line')
      .attr('x1', padding)
      .attr('x2', w)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', 'steelblue');

    verticalLine = svg
      .append('line')
      .attr('x1', padding)
      .attr('x2', padding)
      .attr('y1', 0)
      .attr('y2', h - padding)
      .attr('stroke', 'steelblue');

    select(svgElement).on('mouseleave', () => {
      horizontalLine.style('display', 'none');
      verticalLine.style('display', 'none');
    });
  }
}
