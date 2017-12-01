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
  socket: any;
  private chance;

  constructor(private _appService: AppService) {
    this.socket = io.connect('0.0.0.0:8001');
    this.chance = chance();
  }
  
  
  // Subscribe to Service
  ngOnInit() {
    this._appService.getLocations()
      .subscribe(responseAppData => this.markers = responseAppData);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this._appService.postLocation({
          "lat": position.coords.latitude, 
          "lng": position.coords.longitude, 
          "draggable": false,
          "socketId": this.socket.id,
          "isUser": true,
        }).subscribe();
      });
    }
    this.socket.on('added-location', (data) => {
      this.markers.push(data[0]);
    });

    this.socket.on('disconnected', (data) => {
      this.markers = this.markers.filter((location) => {
        return location['socketId'] !== data && !location['isUser'];
      });
    })
  }

  sendLocation() {
    this.postLocation({
      "lat": Math.random() * (this.lat - this.lng) + this.lng,
      "lng": Math.random() * (this.lat - this.lng) + this.lng,
      "draggable": false,
      "isUser": false,
      "isOpen": Math.random() >= 0.5 ? 'Open Now' : 'Closed'
    })
  }

  postLocation(loc) {
    this._appService.postLocation({
      "lat": loc.lat, 
      "lng": loc.lng, 
      "label": loc.label,
      "draggable": false,
      "isOpen": loc.isOpen
    }).subscribe();
  }

  fetchLocations() {
    this._appService.fetchLocations()
      .subscribe(responseAppData => console.log(responseAppData));
  }

  title = 'Skymap';
  zoom: number =  7;
  lat;
  lng;
  markers: marker[] = [];
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isOpen: string
}