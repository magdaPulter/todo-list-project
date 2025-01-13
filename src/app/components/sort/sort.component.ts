import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order, SortParameter } from '../../utils';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
})
export class SortComponent {
  public sortedByList: SortParameter[] = [
    SortParameter.PRIORITY,
    SortParameter.DATE,
  ];
  public orderList: Order[] = [Order.ASC, Order.DESC];
  @Input() sortedBy!: string | undefined;
  @Input() orderBy!: string | undefined;
  @Output() sortedByEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortedEvent: EventEmitter<string> = new EventEmitter<string>();

  sortByHandle(parameter: string) {
    this.sortedByEvent.emit(parameter);
  }
  sortHandle(order: string) {
    this.sortedEvent.emit(order);
  }
}
