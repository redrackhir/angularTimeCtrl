import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'src/_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    window.setInterval(() => {
      this.deleteMessage();
    }, 5000);
  }

  deleteMessage() {
    console.log('Timer...');
    this.messageService.subtract();
  }

  ngOnDestroy() {
    window.clearInterval();
  }

}
