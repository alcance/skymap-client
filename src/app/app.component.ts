import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  private socket;

  constructor(private _http: Http) {
    this.socket = io.connect('0.0.0.0:8001');
  }

  sendLocation() {
    this.socket.emit('locations', {"lat": 1234.22, "lng": 123123.23});
  }
  
  title = 'Skymap';
  lat: number = 51.678418;
  lng: number = 7.809007;
  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: false
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
