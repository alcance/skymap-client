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

}
