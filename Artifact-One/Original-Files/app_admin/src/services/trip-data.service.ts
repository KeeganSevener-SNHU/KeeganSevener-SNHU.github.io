import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../app/models/trip';
import { User } from '../app/models/user';
import { AuthResponse } from '../app/models/auth-response';
import { BROWSER_STORAGE } from '../app/storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient, 
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }
  // Base URL for other links
  baseURL = 'http://localhost:3000/api';
  // URL for the trips
  url = 'http://localhost:3000/api/trips';

  getTrips() {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // Console.log for debugging.
    // console.log('Currently in TripDataSerive::getTrip method');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    // Console.log for debugging.
    // console.log('Currently in TripDataSerive::updateTrip method');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  
  // login call which  returns a JWT
  login(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }


  // Register call which creates a user and returns a JWT
  register(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string) :
    Observable<AuthResponse> {
      // console.log('Inside TripDataService::handleAuthAPICall');
      let formData = {
        name: user.name,
        email: user.email,
        password: passwd
      };
    return this.http.post<AuthResponse>(this.baseURL + '/' + endpoint,
    formData);
  }
}
