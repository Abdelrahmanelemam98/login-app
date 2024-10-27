import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RemoteComponentService } from '../service/remote-component.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(private remoteComponentService: RemoteComponentService) {}

  ngAfterViewInit(): void {
    this.remoteComponentService
      .loadCardComponent(this.viewContainerRef)
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
