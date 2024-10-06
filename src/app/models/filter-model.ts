import { Signal } from '@angular/core';

export interface FilterModel {
  readonly label: string;
  readonly value: Signal<string>;
}
