import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RemoteComponentService } from '../service/remote-component.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  asd: any;
  constructor(private remoteComponentService: RemoteComponentService) {}

  // async ngAfterViewInit(): Promise<void> {
  //   const componentRef = await this.remoteComponentService.loadHeaderComponent(
  //     this.viewContainerRef
  //   );

  //   this.asd = componentRef.instance as any;

  //   console.log('Loaded component instance:', this.asd);

  //   if (this.asd && this.asd.someData) {
  //     console.log('Specific data from instance:', this.asd.someData);
  //   }

  //   if (this.asd?.outputEvent) {
  //     this.asd.outputEvent.subscribe((eventData: any) => {
  //       console.log('header emitted:', eventData);
  //     });
  //   }
  // }
}
