import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  private _url: string = 'http://localhost:8001/locations'

  constructor(private _http: Http) {}

  getLocations() {
    return this._http.get(this._url)
      .map((response:Response) => response.json());
  }

  fetchLocations() {
    return this._http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=23.289165516865257,-102.08124999999995&radius=50000&type=restaurant&key=AIzaSyBqzk9xJicW_YPEJV9P1NTKeKc4hQtiC6o')
      .map((response:Response) => response.json())
  }

  postLocation(location) {
    return this._http.post(this._url + '/add/', location);
  }

}
