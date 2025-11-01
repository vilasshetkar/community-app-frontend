import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiHelperService } from '../../shared/api-helper.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  loading = false;
  success = false;

  successMessage = '';
  constructor(private fb: FormBuilder, private api: ApiHelperService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.api.post('accounts/users/reset/', { email: this.form.value.email }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.success = true;
        this.successMessage = res?.detail || 'If the email exists, a reset link has been sent.';
      },
      error: () => {
        this.loading = false;
        this.success = true;
        this.successMessage = 'If the email exists, a reset link has been sent.';
      }
    });
  }
}
