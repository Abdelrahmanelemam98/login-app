import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Injectable({
  providedIn: 'root',
})
export class RemoteComponentService {
  constructor(private injector: Injector) {}

  async loadProductListComponent(
    viewContainerRef: ViewContainerRef,
    inputData?: any
  ) {
    const { ProductListComponent } = await loadRemoteModule({
      remoteEntry: 'http://localhost:4200/remoteEntry.js',
      remoteName: 'productApp',
      exposedModule: './ProductListComponent',
    });

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
  }

  async loadProductDetailsComponent(
    viewContainerRef: ViewContainerRef,
    id: number
  ) {
    const { ProductDetailsComponent } = await loadRemoteModule({
      remoteEntry: 'http://localhost:4200/remoteEntry.js',
      remoteName: 'productApp',
      exposedModule: './ProductDetailsComponent',
    });

    const componentRef = viewContainerRef.createComponent(
      ProductDetailsComponent,
      {
        injector: this.injector,
      }
    );

    const instance = componentRef.instance as any;

    instance.productId = id;

    return componentRef;
  }

  async loadCategoryListComponent(viewContainerRef: ViewContainerRef) {
    const { CategoryListComponent } = await loadRemoteModule({
      remoteEntry: 'http://localhost:4200/remoteEntry.js',
      remoteName: 'productApp',
      exposedModule: './CategoryListComponent',
    });

    const componentRef = viewContainerRef.createComponent(
      CategoryListComponent,
      {
        injector: this.injector,
      }
    );

    const instance = componentRef.instance as any;

    return componentRef;
  }
}
