import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RemoteComponentService {
  constructor(private injector: Injector) {}

  loadProductListComponent(
    viewContainerRef: ViewContainerRef,
    inputData?: any
  ): Observable<any> {
    return from(
      loadRemoteModule({
        remoteEntry: 'http://localhost:4200/remoteEntry.js',
        remoteName: 'productApp',
        exposedModule: './ProductListComponent',
      })
        .then(({ ProductListComponent }) => {
          const componentRef = viewContainerRef.createComponent(
            ProductListComponent,
            {
              injector: this.injector,
            }
          );

          const instance = componentRef.instance as any;

          if (inputData) {
            Object.assign(instance, inputData);
          }

          return componentRef;
        })
        .catch((error) => {
          console.error('Error loading ProductListComponent:', error);
          window.location.reload();
          return Promise.reject(error);
        })
    ).pipe(
      catchError((error) => {
        console.error('Error in Observable:', error);
        return throwError(
          () => new Error('Failed to load product list component')
        );
      })
    );
  }

  loadCategoryListComponent(
    viewContainerRef: ViewContainerRef
  ): Observable<any> {
    return from(
      loadRemoteModule({
        remoteEntry: 'http://localhost:4500/remoteEntry.js',
        remoteName: 'categoryApp',
        exposedModule: './CategoryComponent',
      })
        .then(({ CategoryComponent }) => {
          const componentRef = viewContainerRef.createComponent(
            CategoryComponent,
            {
              injector: this.injector,
            }
          );

          return componentRef;
        })
        .catch((error) => {
          console.error('Error loading CategoryComponent:', error);
          window.location.reload();
          return Promise.reject(error);
        })
    ).pipe(
      catchError((error) => {
        console.error('Error in Observable:', error);
        return throwError(
          () => new Error('Failed to load category list component')
        );
      })
    );
  }

  loadCardComponent(viewContainerRef: ViewContainerRef): Observable<any> {
    return from(
      loadRemoteModule({
        remoteEntry: 'http://localhost:4400/remoteEntry.js',
        remoteName: 'appHeader',
        exposedModule: './CardComponent',
      })
        .then(({ CardComponent }) => {
          const componentRef = viewContainerRef.createComponent(CardComponent, {
            injector: this.injector,
          });

          return componentRef;
        })
        .catch((error) => {
          console.error('Error loading Card Component:', error);
          window.location.reload();
          return Promise.reject(error);
        })
    ).pipe(
      catchError((error) => {
        console.error('Error in Observable:', error);
        return throwError(() => new Error('Failed to load card component'));
      })
    );
  }
}
