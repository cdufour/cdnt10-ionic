import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  message: string = "";

  constructor() {
    Network.addListener("networkStatusChange", (status) => {
      console.log(status);
      this.message = status.connected 
        ? "Connecté" : "Déconnecté"
    })
    this.start();
  }

  async start() {
    let status = await Network.getStatus();
    if (status.connected) {
      this.message = "Connecté";
    }
  }

}
