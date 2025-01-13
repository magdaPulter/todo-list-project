import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() modalCanceledEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalConfimedEvent: EventEmitter<void> = new EventEmitter<void>();

  modalCanceled() {
    this.modalCanceledEvent.emit();
  }

  modalConfimed() {
    this.modalConfimedEvent.emit();
  }
}
