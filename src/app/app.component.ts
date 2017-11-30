import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as io from 'socket.io-client';
import * as chance from 'chance';

@Component({
  selector: 'app-root',
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private socket;
  private chance;
  markers: marker[] = [];

  constructor(private _appService: AppService) {
    this.socket = io.connect('0.0.0.0:8001');
    this.chance = chance();
  }
  
  // Subscribe to Service
  ngOnInit() {
    this._appService.getLocations()
      .subscribe(responseAppData => this.markers = responseAppData);
  }

  getRandomLoc(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }

  sendLocation() {
    this.socket.emit('locations', {"lat": this.chance.latitude(), "lng": this.chance.altitude(), "label": "w00t", "draggable": false});
  }
  
  title = 'Skymap';
  lat: number = 31.015279;
  lng: number = -80.523438;
  zoom: 9;
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}