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

  constructor() {
    this.socket = io.connect('0.0.0.0:8001');
  }

  sendLocation() {
    console.log('emiting..');
    this.socket.emit('locations', 'Is anybody outhere');
  }
  
  title = 'Skymap';
  lat: number = 51.678418;
  lng: number = 7.809007;
}
