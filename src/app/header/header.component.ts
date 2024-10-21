import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RemoteComponentService } from '../service/remote-component.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  constructor(private remoteComponentService: RemoteComponentService) {}

  ngOnInit(): void {
    this.loadHeaderComponent();
  }

  async loadHeaderComponent() {
    await this.remoteComponentService.loadHeaderComponent(
      this.viewContainerRef
    );
  }

  // Handle the data received from the header component
  handleData(data: any) {
    // Process the received data as needed
    console.log('Received data from header:', data);
  }
}
