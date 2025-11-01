
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params, RouterModule } from '@angular/router';
import { ApiHelperService } from '../api-helper.service';
import { combineLatest } from 'rxjs';

import { CarouselModule } from 'ngx-bootstrap/carousel';
@Component({
  selector: 'app-blog-listing',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, RouterModule, CarouselModule],
  templateUrl: './blog-listing.html'
})
export class BlogListing implements OnInit {
  blogs: any[] = [];
  total = 0;
  page = 1;
  pageSize = 30;
  search = '';
  status: 'Active' | 'Inactive' | '' = 'Active';
  categoryId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiHelperService
  ) {}

  ngOnInit() {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(([params, qp]) => {
      this.categoryId = params.get('categoryId') || '';
      this.page = +(qp.get('page') || 1);
      this.pageSize = +(qp.get('page_size') || 30);
      this.search = qp.get('search') || '';
      this.status = (qp.get('status') as 'Active' | 'Inactive') || 'Active';
      this.fetchBlogs();
    });
  }

  fetchBlogs() {
    const params: any = {
      page: this.page,
      page_size: this.pageSize,
      status: this.status
    };
    // Only send category if not 'general' and not empty
    if (this.categoryId && this.categoryId !== 'general') {
      params.category = this.categoryId;
    }
    if (this.search) params.search = this.search;
    this.api.get<any>('/posts/posts/', { params }).subscribe({
      next: (data: any) => {
        this.blogs = Array.isArray(data?.results) ? data.results : (Array.isArray(data) ? data : []);
        this.total = data?.count || this.blogs.length;
      },
      error: () => {
        this.blogs = [];
        this.total = 0;
      }
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page, page_size: this.pageSize, search: this.search, status: this.status },
      queryParamsHandling: 'merge',
    });
  }
}
