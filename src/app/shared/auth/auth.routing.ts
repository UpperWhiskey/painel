import { Routes } from '@angular/router';

import { ForbiddenComponent } from './components/forbidden.component';
import { RefreshErrorComponent } from './components/refresh-error.component';

export const authRouting: Routes = [
  { path: 'auth/error', component: RefreshErrorComponent },
  { path: 'auth/forbidden', component: ForbiddenComponent }
];
