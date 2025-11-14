import { Routes } from '@angular/router';
import { ProfileViewComponent } from './presentation/pages/profile-view/profile-view.component';
import { PreferencesViewComponent } from './presentation/pages/preferences-view/preferences-view.component';

export const PROFILE_ROUTES: Routes = [
  { path: '', component: ProfileViewComponent},
  { path: 'preferences', component: ProfileViewComponent},
  ];
