import { Injectable,Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(
    private authenticationService: AuthenticationService
    ) {}

    // Intercepts ANY http request and handles it.
    intercept(request: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
      
        var isAuthAPI: boolean;
      
        // console.log('Interceptor::URL' + request.url);
        
        // Make sure we do not intercept /login or /register requests. 
        // Modifying them would be redundant.
        if (request.url.startsWith('login') || request.url.startsWith('register')) {
          isAuthAPI = true;
        }
        else {
          isAuthAPI = false;
        }
        
        // modify all other requests to include the Auth Header
        if(this.authenticationService.isLoggedIn() && !isAuthAPI) {
          let token = this.authenticationService.getToken();
          // console.log(token);
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          //Return cloned request.
          return next.handle(authReq);
        }
        return next.handle(request);
      }
}


export const authInterceptProvider: Provider =
  { provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor, multi: true };