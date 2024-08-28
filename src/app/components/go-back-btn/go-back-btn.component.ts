import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-go-back-btn',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './go-back-btn.component.html',
  styleUrl: './go-back-btn.component.scss',
})
export class GoBackBtnComponent {}
