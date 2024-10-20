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

  asd: any;
  constructor(private remoteComponentService: RemoteComponentService) {}

  async ngAfterViewInit(): Promise<void> {
    const componentRef =
      await this.remoteComponentService.loadProductListComponent(
        this.viewContainerRef
      );

    this.asd = componentRef.instance as any;

    console.log('Loaded component instance:', this.asd);

    if (this.asd && this.asd.someData) {
      console.log('Specific data from instance:', this.asd.someData);
    }

    if (this.asd?.outputEvent) {
      this.asd.outputEvent.subscribe((eventData: any) => {
        console.log('Product List Event emitted:', eventData);
      });
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.asd.outputEv.set('ahmed');
    }, 5000);
  }
}
