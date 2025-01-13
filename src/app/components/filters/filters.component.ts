import { Component, Input, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { utils } from '../../utils';
import { ProductViewModel } from '../../view-models/product.view-model';
import { FilterViewModel } from '../../view-models/filter-view-model.view-model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  public priorityNumber = utils.priority;

  @Input() projects!: ProductViewModel[];
  @Input() filterOptions!: FilterViewModel[];
  @Input() filterOptionsObjArr!: FilterViewModel[];
}
