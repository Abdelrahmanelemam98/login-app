import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './guard/guards/auth.guard';

// Function to load the remote module
const loadProductModule = () =>
  loadRemoteModule({
    remoteEntry: 'http://localhost:4200/remoteEntry.js',
    remoteName: 'productApp',
    exposedModule: './routes',
  })
    .then((m) => m.routes)
    .catch((err) => {
      console.error('Error loading remote module:', err);
      throw err;
    });

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'product',
    loadChildren: loadProductModule,
    canActivate: [authGuard],
  },
  {
    path: 'product/:id',
    loadChildren: loadProductModule,
  },
];
