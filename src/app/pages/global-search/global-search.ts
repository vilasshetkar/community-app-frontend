import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  template: `
    <div class="card card-body mb-3">
      <h2 *ngIf="heading">{{ heading }}</h2>
      <h5 *ngIf="subHeading">{{ subHeading }}</h5>
      <p *ngIf="description">{{ description }}</p>
      <form class="form-horizontal mb-3" (ngSubmit)="onSearch()">
        <div class="form-group">
          <div class="input-group my-3">
            <input type="text" class="form-control form-control-lg" [(ngModel)]="searchTerm" name="searchTerm" placeholder="Search here">
            <button type="submit" class="btn btn-lg btn-primary">
              <span>Search</span>
              <i class="bi bi-search px-2"></i>
            </button>
          </div>
        </div>
      </form>
      <ng-container *ngIf="resultType && resultComponent">
        <ng-container *ngComponentOutlet="resultComponent; injector: resultInjector"></ng-container>
      </ng-container>
      <div class="d-flex justify-content-center align-items-center mt-3">
        <ngb-pagination [collectionSize]="totalResults" [(page)]="page" [pageSize]="pageSize" [maxSize]="5" [rotate]="true" (pageChange)="onPageChange($event)"></ngb-pagination>
      </div>
    </div>
  `
})
export class GlobalSearch {
  @Input() heading = 'Global Search';
  @Input() subHeading?: string;
  @Input() description?: string;

  searchTerm = '';
  page = 1;
  pageSize = 10;
  totalResults = 0;

  resultType: string | null = null;
  resultComponent: any = null;
  resultInjector: any = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resultType = params['type'] || null;
      this.loadResultComponent();
    });
    this.route.queryParams.subscribe(q => {
      this.page = +q['page'] || 1;
      this.searchTerm = q['q'] || '';
    });
  }

  onSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchTerm, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  async loadResultComponent() {
    if (this.resultType === 'blog') {
      const { BlogCardComponent } = await import('../../shared/blog-listing/blog-card');
      this.resultComponent = BlogCardComponent;
    } else if (this.resultType === 'category') {
      const { CategoryCardComponent } = await import('../../shared/category-listing/category-card');
      this.resultComponent = CategoryCardComponent;
    } else {
      this.resultComponent = null;
    }
  }
}
