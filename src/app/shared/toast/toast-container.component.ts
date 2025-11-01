import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100;">
      <app-toast
        *ngFor="let toast of toastService.toasts"
        [message]="toast.message"
        [type]="toast.type"
        [show]="true"
        (closed)="toastService.remove(toast.id)"
      ></app-toast>
    </div>
  `
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
