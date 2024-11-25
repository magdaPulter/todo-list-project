import { Signal } from '@angular/core';

export interface FilterViewModel {
  readonly label: string;
  readonly value: Signal<string>;
}
