import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  message: string = "";

  constructor(
    private network: Network,
    private vibration: Vibration) {
    
      // watch network for a disconnection
      let message = this.network.onDisconnect().subscribe(() => {
        this.message = 'network was disconnected :-(';
      });

      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.message = 'network connected!';
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.message = 'we got a wifi connection, woohoo!';
          }
        }, 3000);
      })
  }

  onClick() {
    this.vibration.vibrate(1000);
  }

}
