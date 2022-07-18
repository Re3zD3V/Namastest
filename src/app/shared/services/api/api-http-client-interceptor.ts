import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notifications/notification.service';
import { TokenDecoderService } from '../token/token-decoder.service';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpClientInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService, private tokenDecoder: TokenDecoderService, private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    /**
     * If the user is logged in add the token to the request's headers.
     */
    if(this.tokenDecoder.isAuthenticated()) {
      const Authorization = `Bearer ${this.tokenStorage.getToken()}`;
      
      req = req.clone({ setHeaders: { Authorization } });
    }
    
    /**
     * If the request method is patch set specific header else set regular 'application/json'
     */
    let contentType = req.method === 'PATCH' ? 'application/merge-patch+json' : 'application/json';
    
    req = req.clone({ setHeaders: { 'Content-Type': contentType } });

    /**
     * Handle errors from both client and server's side
     */
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
            this.notificationService.showError(errorMsg, 'An error occured on the client\'s side');
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            this.notificationService.showError(errorMsg, 'An error occured on the server\'s side');
          }
          return throwError(errorMsg);
        })
      );
  }
}
