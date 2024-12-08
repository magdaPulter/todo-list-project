import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemViewModel } from '../../view-models/item.view-model';
import { RouterModule } from '@angular/router';
import { utils } from '../../utils';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input() item!: ItemViewModel;
  @Output() checkEvent: EventEmitter<ItemViewModel> =
    new EventEmitter<ItemViewModel>();
  public priorityFlag = utils.priorityFlag;

  onCheck(item: ItemViewModel) {
    this.checkEvent.emit(item);
  }
}
