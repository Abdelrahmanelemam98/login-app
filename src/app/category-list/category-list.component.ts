import {
  AfterViewInit,
  Component,
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
export class CategoryListComponent implements AfterViewInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(private remoteComponentService: RemoteComponentService) {}
  ngAfterViewInit(): void {}

  ngOnInit() {
    const componentRef: any =
      this.remoteComponentService.loadCategoryListComponent(
        this.viewContainerRef
      );
    console.log('from category');
    const instance = componentRef.instance as any;
    if (instance.outputEvent) {
      instance.outputEvent.subscribe((eventData: any) => {
        console.log('Category List Event emitted:', eventData);
      });
    }
  }
}
