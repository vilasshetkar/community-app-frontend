import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  ngAfterViewInit() {
    // @ts-ignore
    if (typeof WOW !== 'undefined') {
      setTimeout(() => {
        // @ts-ignore
        new WOW({
          boxClass: 'wow',
          animateClass: 'animate__animated',
          offset: 50,
          mobile: true,
          live: true
        }).init();
      }, 0);
    }
  }
}
