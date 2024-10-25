import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalerrorService {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk + failed/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}
