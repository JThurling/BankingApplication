import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  display: boolean;
  items: any[] = [
    {
      label: 'Home',
      routerLink: '/'
    },
    {
      label: 'Account ->',
      items: [
        {
          label: 'Create Account',
          routerLink: '/create'
        },
        {
          label: 'View Accounts',
          routerLink: '/account'
        },
        {
          label: 'Deposit',
          routerLink: '/deposit',
        }
      ]
    },
    {
      label: 'Transfers ->',
      items: [
        {
          label: 'Make a transfer',
          routerLink: '/transfers'
        },
        {
          label: 'Transfer History',
          routerLink: '/transfer-history'
        }
      ]
    }
  ];

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.display = false;
    })
  }

  ngOnInit(): void {
  }

}
