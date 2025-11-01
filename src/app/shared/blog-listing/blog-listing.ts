
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params, RouterModule } from '@angular/router';
import { ApiHelperService } from '../api-helper.service';

@Component({
  selector: 'app-blog-listing',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, RouterModule],
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
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId') || '';
      this.page = +(this.route.snapshot.queryParamMap.get('page') || 1);
      this.pageSize = +(this.route.snapshot.queryParamMap.get('page_size') || 30);
      this.search = this.route.snapshot.queryParamMap.get('search') || '';
      this.status = (this.route.snapshot.queryParamMap.get('status') as 'Active' | 'Inactive') || 'Active';
      this.fetchBlogs();
    });
    this.route.queryParamMap.subscribe(qp => {
      this.page = +(qp.get('page') || 1);
      this.pageSize = +(qp.get('page_size') || 30);
      this.search = qp.get('search') || '';
      this.status = (qp.get('status') as 'Active' | 'Inactive') || 'Active';
      this.fetchBlogs();
    });
  }

  fetchBlogs() {
    const params: any = {
      category: this.categoryId,
      page: this.page,
      page_size: this.pageSize,
      status: this.status
    };
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
