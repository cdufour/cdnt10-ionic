import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lat: number;
  lng: number;

  constructor() {
    this.getPosition();
  
  }

  async getPosition() {
    let coords = await Geolocation.getCurrentPosition();
    let { latitude, longitude } = coords.coords;
    this.lat = latitude;
    this.lng = longitude;
  }

}
