/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string, public timestamp?: Date) { }
}

@Injectable()
export class ChatService {
  constructor() { }

  conversation = new Subject<Message[]>();

  messageMap = {
    "Hi": "Hello",
    "Who are you": "My name is Dmantz Bot",
    "How are you": "I am Fine. What about you",
    "Can you help": "How can i help you",
    "I need Product Information": "Which type of product.Do You want to Know",
    "default": "I can't understand. Can you please repeat"
  }

  getBotAnswer(msg: string, timestamp: Date) {
    const userMessage = new Message('user', msg, timestamp);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));

    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1000);
  }

  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }
}