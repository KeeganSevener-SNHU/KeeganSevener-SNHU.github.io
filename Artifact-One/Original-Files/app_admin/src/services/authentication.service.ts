import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../app/storage';
import { User } from '../app/models/user';
import { AuthResponse } from '../app/models/auth-response';
import { TripDataService } from '../services/trip-data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Setup our storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
    ) { }
    // Variable to handle Authentication Responses
    authResp: AuthResponse = new AuthResponse();

    // Get our token from our Storage provider.
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    
    //console.log("out is " + JSON.stringify(out));
    // Make sure we return a string even if we don't have a token
    if(!out) {
      // Debug statement
      //console.log("are we in '!out' ??");
      return '';
    }
    //debug statement
    //console.log("are we NOT in '!out' ??");
    return out;
  }

  // Save our token to our Storage provider.
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout of our application and remove the JWT from Storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }


  // Boolean to determine if we are logged in and the token is
  // valid or invalid. This method should always be called before getCurrentUser.
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      
      console.log(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } 
    else {
      return false;
    }
  }

// Retrieve the current user. Only call this after checking 
// that the user isLoggedIn.
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

// Login method that leverages the login method in tripDataService
// Because that method returns an observable, we subscribe to the
// result and only process when the Observable condition is satisfied
// Uncomment the two console.log messages for additional debugging
// information.
  public login(user: User, passwd: string) : void {
    this.tripDataService.login(user,passwd)
    .subscribe({
      next: (value: any) => {
        if(value) {
          //DEBUG log
          //console.log(" WE ARE IN authentication SERVICE : value is " + value.JWtoken);
          // We need to EXPLICTLY assign the JWT to the authResp token string.
          // The JWT is JWtoken in my application.
          this.authResp.token = value.JWtoken;
          // Debug log
          this.saveToken(this.authResp.token);
        }
      },
    error: (error: any) => {
      console.log('Error: ' + error);
    }
    })
  }


  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // This method is nearly identical to the login method because 
  // the behavior of the API logs a new user in upon registration
  public register(user: User, passwd: string) : void {
    this.tripDataService.register(user, passwd)
    .subscribe({
    next: (value: any) => {
      if(value) {
        console.log(value);
        // We need to EXPLICTLY assign the JWT to the authResp token string.
        // The JWT is JWtoken in my application.
        this.authResp.token = value.JWtoken;
        this.saveToken(this.authResp.token);
      }
    },
    error: (error: any) => {
      console.log('Error: ' + error);
    }
    })
  }
}