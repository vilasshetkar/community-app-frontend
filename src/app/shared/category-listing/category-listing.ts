import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card';

@Component({
  selector: 'app-category-listing',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  template: `<app-category-card [categories]="categories"></app-category-card>`
})
export class CategoryListing {
  categories = [
    { name: 'Tech', description: 'Technology news and articles.' },
    { name: 'Health', description: 'Health and wellness tips.' },
    { name: 'Travel', description: 'Travel stories and guides.' }
  ];
}

export { CategoryCardComponent };
