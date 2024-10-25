import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RemoteComponentService } from '../service/remote-component.service';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(private remoteComponentService: RemoteComponentService) {}

  ngAfterViewInit(): void {
    // Subscribe to the observable to load the product list component
    this.remoteComponentService
      .loadProductListComponent(this.viewContainerRef)
      .subscribe(
        (componentRef: any) => {
          const instance = componentRef.instance as any;
          console.log('Loaded component instance:', instance);

          if (instance.someData) {
            console.log('Specific data from instance:', instance.someData);
          }

          if (instance?.outputEvent) {
            instance.outputEvent.subscribe((eventData: any) => {
              console.log('Product List Event emitted:', eventData);
            });
          }
        },
        (error) => {
          console.error('Error loading component:', error);
        }
      );
  }
}
