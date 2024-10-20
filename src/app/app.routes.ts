import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './guard/guards/auth.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'product',
  //   loadComponent: () => {
  //     return loadRemoteModule({
  //       remoteEntry: 'http://localhost:4200/remoteEntry.js',
  //       remoteName: 'productApp',
  //       exposedModule: './ProductListComponent',
  //     })
  //       .then((m) => m.ProductListComponent)
  //       .catch((err) => {
  //         console.error('Error loading remote component:', err);
  //         throw err;
  //       });
  //   },
  //   canActivate: [authGuard],
  // },
  {
    path: 'product/:id',
    loadComponent: () => {
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4200/remoteEntry.js',
        remoteName: 'productApp',
        exposedModule: './ProductDetailsComponent',
      })
        .then((m) => m.ProductDetailsComponent)
        .catch((err) => {
          console.error('Error loading remote component:', err);
          throw err;
        });
    },
  },

  // {
  //   path: 'category',
  //   loadComponent: () => {
  //     return loadRemoteModule({
  //       remoteEntry: 'http://localhost:4200/remoteEntry.js',
  //       remoteName: 'productApp',
  //       exposedModule: './CategoryListComponent',
  //     })
  //       .then((m) => m.CategoryListComponent)
  //       .catch((err) => {
  //         console.error('Error loading remote component:', err);
  //         throw err;
  //       });
  //   },
  // },

  { path: 'product', component: ProductListComponent },
  { path: 'category', component: CategoryListComponent },
];
