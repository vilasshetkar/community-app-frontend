import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { BlogDetails } from './shared/blog-details/blog-details';
import { BlogListing } from './shared/blog-listing/blog-listing';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { AuthGuard } from './auth/auth.guard';
import { authRoutes } from './auth/auth-routing.module';
import { PendingForApprovalComponent } from './pages/pending-for-approval/pending-for-approval.component';
import { DashboardMain } from './pages/dashboard-main/dashboard-main';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routing.module').then(m => m.authRoutes)
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', component: DashboardMain },
            { path: 'blog/:blogId/:blogTitle', component: BlogDetails },
            { path: 'category/:categoryId', component: BlogListing },
            { path: ':categoryId/create-post', component: CreatePostComponent },
        ]
    },
    { path: 'pending-for-approval', component: PendingForApprovalComponent },
    { path: '**', redirectTo: '' }
];
