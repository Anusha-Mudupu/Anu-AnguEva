/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';
// import { MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatInputModule


  ],
  declarations: [ChatComponent],
  providers: [ChatService]
})
export class CustomerBotModule { }