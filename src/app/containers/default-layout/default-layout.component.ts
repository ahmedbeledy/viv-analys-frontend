import { Component } from '@angular/core';
// import { LoginComponent } from ';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../../views/pages/login/login.component.html'
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
