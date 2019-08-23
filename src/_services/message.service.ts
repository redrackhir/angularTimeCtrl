import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: string[] = [];
  timerOn = false;

  add(message: string, alertType: string) {
    this.messages.push(alertType + '|' + message);
    if (!this.timerOn) {
      this.timerOn = true;
      window.setInterval(() => {
        this.subtract();
      }, 3000);
    }
  }

  subtract() {
    if (this.messages.length > 0) {
      this.messages.shift();
    } else {
      if (this.timerOn) { window.clearInterval(); this.timerOn = false; }
    }
  }

  clear() {
    this.messages = [];
  }
}
