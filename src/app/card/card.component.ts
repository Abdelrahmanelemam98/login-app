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

  asd: any;
  constructor(private remoteComponentService: RemoteComponentService) {}

  async ngAfterViewInit(): Promise<void> {
    // const componentRef = await this.remoteComponentService.loadCardComponent(
    //   this.viewContainerRef
    // );
    // this.asd = componentRef.instance as any;
    // console.log('Loaded component instance: card', this.asd);
    // if (this.asd && this.asd.someData) {
    //   console.log('Specific data from instance: card', this.asd.someData);
    // }
    // if (this.asd?.outputEvent) {
    //   this.asd.outputEvent.subscribe((eventData: any) => {
    //     console.log('header emitted:', eventData);
    //   });
    // }
  }

  ngOnInit() {
    const componentRef: any = this.remoteComponentService.loadCardComponent(
      this.viewContainerRef
    );
    console.log('from Card');
    const instance = componentRef.instance as any;
    if (instance.outputEvent) {
      instance.outputEvent.subscribe((eventData: any) => {
        console.log('Card List Event emitted: card', eventData);
      });
    }
  }
}
