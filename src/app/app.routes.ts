import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { PsychologistViewComponent } from './profile/presentation/pages/psychologist-view/psychologist-view.component';
import { ProfileViewComponent } from './profile/presentation/pages/profile-view/profile-view.component';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(
    (m) => m.PageNotFound
  );

const baseTitle = 'PsychoTest';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },

  {
    path: 'profile',
    component: ProfileViewComponent,
    title: `${baseTitle} - Student Profile`,
  },

  {
    path: 'psychologist-profile',
    component: PsychologistViewComponent,
    title: `${baseTitle} - Psychologist Profile`,
  },


  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
  { path: 'home', component: Home, title: `${baseTitle} - Home`  },
  {
    path: 'student-dashboard',
    loadChildren: () => import('./student-dashboard/presentation/student-dashboard.routes').then(m => m.STUDENT_DASHBOARD_ROUTES),
    title: `${baseTitle} - Student Dashboard`
  },
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: '**', loadComponent:  pageNotFound, title: `${baseTitle} - Page Not Found`  },
];
