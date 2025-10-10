import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';


const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const somCenter = () => import('./modules/som/presentation/views/som-center/som-center.view').then(m => m.SomCenterView);
const somCreate = () => import('./modules/som/presentation/views/som-create/som-create.view').then(m => m.SomCreateView);
const baseTitle = 'PsychoTest';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home`  },

  { path: 'som', loadComponent: somCenter, title: 'Notificaciones' },
  { path: 'som/new', loadComponent: somCreate, title: 'Crear notificación' },
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: '**', loadComponent:  pageNotFound, title: `${baseTitle} - Page Not Found`  }


];
