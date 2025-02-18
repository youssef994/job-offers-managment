import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CompanyDetails} from '../company/company';
import {AppAuthService} from '../../pages/login/_services/app-auth.service';
import {AppService} from '../../pages/login/_services/app.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  requiredRole?: string;
  dynamicPath?: boolean;
  requiresId?: boolean;

}

export const ROUTES: RouteInfo[] = [
  {path: '/AllJobs', title: 'Home', icon: 'ni-tv-2 text-primary', class: ''},
  {
    path: '/create-candidate',
    title: 'create profile',
    icon: 'ni-bullet-list-67 text-red',
    requiredRole: 'VISITEUR',
    class: ''
  },
  {
    path: '/create-candidate',
    title: 'create profile',
    icon: 'ni-bullet-list-67 text-red',
    requiredRole: 'ADMIN',
    class: ''
  },
  {
    path: '/candidate',
    title: 'Profile',
    icon: 'ni-bullet-list-67 text-red',
    class: '',
    requiredRole: 'VISITEUR',
  },

  {
    path: '/updatecandidate',
    title: 'Update Profile',
    icon: 'ni-bullet-list-67 text-red',
    class: '',
    requiredRole: 'VISITEUR',
  },
  {
    path: '/createCompany', title: 'Organisation', icon: 'ni-circle-08 text-pink', class: '',
    requiredRole: 'ADHERANT'
  },
  {
    path: '/echange', title: 'Programme echange', icon: 'ni-circle-08 text-pink', class: '',
    requiredRole: 'VISITEUR'
  },
  {
    path: '/getCompany',
    title: 'Organisation profile',
    icon: 'ni-bullet-list-67 text-red',
    class: '',
    requiredRole: 'ADHERANT',
  },
  {
    path: '/getAllUsers',
    title: 'Users List',
    icon: 'ni-bullet-list-67 text-red',
    class: '',
    requiredRole: 'ADMIN',
  },
  {
    path: '/create-job',
    title: 'New Post',
    icon: 'ni-bullet-list-67 text-red',
    class: '',
    requiredRole: 'ADHERANT',
    requiresId: true
  },
  {
    path: '/getAlljobsCompany',
    title: 'My Posts',
    icon: 'ni-bullet-list-67 text-red',
    class: '',
    requiredRole: 'ADHERANT',
    requiresId: true
  },
  {
    path: '/allarticles',
    title: 'All Articles',
    icon: 'ni ni-istanbul',
    class: '',
    requiredRole: 'VISITEUR',
    requiresId: true
  },
  {
    path: '/myarticles',
    title: 'My Articles',
    icon: 'ni ni-istanbul',
    class: '',
    requiredRole: 'VISITEUR',
    requiresId: true
  },
  {
    path: '/savedarticles',
    title: 'Saved Articles',
    icon: 'ni ni-istanbul',
    class: '',
    requiredRole: 'VISITEUR',
    requiresId: true
  },
  {
    path: '/logement',
    title: 'Logement',
    icon: 'ni ni-icon-name',
    class: '',
    requiredRole: 'VISITEUR',
    requiresId: false
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  companyDetails: CompanyDetails | null;
  companyId: string | null = null;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
              private appAuthService: AppAuthService,
              public appService: AppService
  ) {
  }

  public isLoggedIn() {
    return this.appAuthService.isLoggedIn();
  }

  ngOnInit() {
    this.companyId = localStorage.getItem('companyId');
    this.menuItems = ROUTES.filter(menuItem => {
      if (menuItem.requiredRole && !this.appService.roleMatch(menuItem.requiredRole)) {
        return false;
      }
      return true;
    })
      .map(menuItem => {
        if (menuItem.requiresId && this.companyId) {
          return {
            ...menuItem,
            path: `${menuItem.path}/${this.companyId}`
          };
        }
        return menuItem;
      });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  public logout() {
    this.appAuthService.clear();
    this.router.navigate(['/login']);
  }
}
