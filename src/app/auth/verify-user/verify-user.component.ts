import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiHelperService } from '../../shared/api-helper.service';

@Component({
  selector: 'app-verify-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  config: any = {};
  data: any = {};
  loading = true;
  success = false;
  errMessage = '';
  private route = inject(ActivatedRoute);
  private api = inject(ApiHelperService);
  private defaultConfig = {
    verifyUserHeadingClass: 'fw-light',
    verifyUserSubHeadingClass: 'fw-light text-muted',
    verifyUserDescriptionClass: 'mb-3 text-muted',
    verifyUserPreloaderClass: 'preloader-container',
    verifyUserSpinnerClass: 'spinner-border text-primary',
    verifyUserErrorHeadingClass: 'text-danger mb-5',
    verifyUserErrorBtnClass: 'btn btn-warning px-5',
    verifyUserErrorLoginBtnClass: 'ms-3 btn btn-info px-5',
    verifyUserSuccessHeadingClass: 'text-success mb-5',
    verifyUserSuccessBtnClass: 'btn btn-primary px-5',
  };
  private defaultData = {
    verifyUserHeading: 'Verify Email',
    verifyUserSubHeading: 'Please check your inbox for a verification link.',
    verifyUserDescription: 'Once email verified you will unlock unlimited benefits. Just wait we are verifying your email.',
    verifyUserErrorBtnText: 'Reset Password',
    verifyUserErrorLoginBtnText: 'Login',
    verifyUserSuccessHeading: 'Your Email has been successfully verified!',
    verifyUserSuccessBtnText: 'Login',
  };
  uid = '';
  token = '';

  ngOnInit() {
    this.config = { ...this.defaultConfig };
    this.data = { ...this.defaultData };
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.verifyUser();
  }

  verifyUser() {
    this.loading = true;
    this.success = false;
    this.errMessage = '';
    this.api.get(`/accounts/users/verify-email/${this.uid}/${this.token}/`).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        this.loading = false;
        this.success = false;
        this.errMessage = err?.error?.error?.message || 'Verification failed. Please try again.';
      }
    });
  }
}
