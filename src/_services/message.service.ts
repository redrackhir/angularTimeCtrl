import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string, alertType: string) {
    this.messages.push(alertType + '|' + message);
  }

  subtract() {
    if (this.messages.length > 0) {
      this.messages.shift();
    }
  }

  clear() {
    this.messages = [];
  }
}
