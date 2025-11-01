
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavbar } from './shared/header-navbar/header-navbar';
import { ToastContainerComponent } from './shared/toast/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderNavbar, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('argo-atlantic');
}
