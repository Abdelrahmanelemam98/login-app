import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RemoteComponentService } from '../service/remote-component.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements AfterViewInit, OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(private remoteComponentService: RemoteComponentService) {}
  ngOnInit(): void {
    this.remoteComponentService
      .loadCategoryListComponent(this.viewContainerRef)
      .subscribe(
        (componentRef: any) => {
          const instance = componentRef.instance as any;

          if (instance.outputEvent) {
            instance.outputEvent.subscribe((eventData: any) => {
              console.log('Category List Event emitted:', eventData);
            });
          }
        },
        (error) => {
          console.error('Error loading remote component:', error);
        }
      );
  }

  ngAfterViewInit(): void {
    // Subscribe to the observable to load the category list component
  }
}
