import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserIdentityService } from '../../shared/user-identity.service';
import { ApiHelperService } from '../../shared/api-helper.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  user: any;
  passwordChanged = signal(false);

  constructor(
    private fb: FormBuilder,
    private userIdentity: UserIdentityService,
    private api: ApiHelperService
  ) {}

  ngOnInit() {
    this.user = this.userIdentity.userDetails;
    this.profileForm = this.fb.group({
      firstName: [{ value: this.user?.firstName || '', disabled: true }],
      lastName: [{ value: this.user?.lastName || '', disabled: true }],
      email: [{ value: this.user?.email || '', disabled: true }],
      phone: [{ value: this.user?.phone || '', disabled: true }],
      // Add more fields as needed
    });
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onChangePassword() {
    if (this.passwordForm.invalid) return;
    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;
    this.api.post('/accounts/users/change-password/', { oldPassword, newPassword, confirmPassword }).subscribe({
      next: () => {
        this.passwordChanged.set(true);
      }
    });
  }
}
