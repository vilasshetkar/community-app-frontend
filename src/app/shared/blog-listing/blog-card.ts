import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-3" *ngFor="let blog of blogs">
      <div class="card-body">
        <h5 class="card-title">{{ blog.title }}</h5>
        <p class="card-text">{{ blog.summary || 'No summary available.' }}</p>
      </div>
    </div>
  `
})
export class BlogCardComponent {
  @Input() blogs: any[] = [];
}
