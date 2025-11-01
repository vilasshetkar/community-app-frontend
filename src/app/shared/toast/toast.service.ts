import { Injectable } from '@angular/core';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastMessage[] = [];
  private idCounter = 0;

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', delay = 5000) {
    const id = ++this.idCounter;
    this.toasts.push({ message, type, id });
    setTimeout(() => this.remove(id), delay);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}
