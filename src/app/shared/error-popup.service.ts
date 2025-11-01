import { Injectable } from '@angular/core';
import { ToastService } from './toast/toast.service';

@Injectable({ providedIn: 'root' })
export class ErrorPopupService {
  constructor(private toast: ToastService) {}

  show(message: string, type: 'error' | 'success' | 'warning' | 'info' = 'success') {
    this.toast.show(message, type);
  }

  close() {
    // No-op: Toasts auto-close or can be closed by user
  }
}
