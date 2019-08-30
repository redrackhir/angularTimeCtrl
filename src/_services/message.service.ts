import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: string[] = [];
  timerOn = false;
  timerId: any;

  add(message: string, alertType: string) {
    this.messages.push(alertType + '|' + message);
    if (!this.timerOn) {
      this.timerOn = true;
      this.timerId = window.setInterval(() => {
        this.subtract();
      }, 3000);
      this.showDebug();
    }
  }

  subtract() {
    this.showDebug();
    if (this.messages.length > 0) {
      this.messages.shift();
    } else {
      if (this.timerOn) {
        window.clearInterval(this.timerId);
        this.timerOn = false;
      }
    }
  }

  clear() {
    this.messages = [];
  }

  showDebug() {
    console.log(`Timer: ${this.timerOn}; Messages queue: ${this.messages.length}`);
  }
}
