import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-3" *ngFor="let category of categories">
      <div class="card-body">
        <h5 class="card-title">{{ category.name }}</h5>
        <p class="card-text">{{ category.description || 'No description available.' }}</p>
      </div>
    </div>
  `
})
export class CategoryCardComponent {
  @Input() categories: any[] = [];
}
