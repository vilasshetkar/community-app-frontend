import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiHelperService } from '../../shared/api-helper.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, RouterModule],
  templateUrl: './dashboard-main.html',
  styleUrls: ['./dashboard-main.scss']
})
export class DashboardMain implements OnInit {
  categories: any[] = [];

  constructor(
    private api: ApiHelperService
  ) { }

  ngOnInit() {
    this.api.get<any>('posts/categories/?limit=100').subscribe({
      next: (data: any) => {
        this.categories = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];
      },
      error: () => {
        this.categories = [];
      }
    });
  }
}
