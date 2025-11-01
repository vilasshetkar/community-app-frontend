import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @Input() config: any;
  @Input() data: any;

  private defaultConfig = {
    logoutHeadingClass: 'fw-light text-sm-start',
    logoutDescriptionClass: 'mb-3 text-muted text-sm-start',
    actionsWrapperClass: 'd-flex gap-3',
    logoutLoginBtnClass: 'py-2 btn btn-primary flex-fill',
    logoutHomeBtnClass: 'py-2 btn btn-outline-info flex-fill',
  };

  private defaultData = {
    headerText: 'You have been successfully Logged out.',
    messageText: 'Thank you for using our portal.',
    loginBtnText: 'Login Again',
    homeBtnText: 'Go to Home',
  };

  ngOnInit() {
    this.data = { ...this.defaultData, ...(this.data || {}) };
    this.config = { ...this.defaultConfig, ...(this.config || {}) };
  }
}
