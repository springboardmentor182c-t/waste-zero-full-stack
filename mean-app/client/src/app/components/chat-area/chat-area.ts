import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message, ChatMessage } from '../../app';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-area.html',
  styleUrls: ['./chat-area.css']
})
export class ChatAreaComponent {
  @Input() darkMode = false;
  @Input() selectedMessage: Message | null = null;
  @Input() chatMessages: ChatMessage[] = [];
  @Output() sendMessage = new EventEmitter<string>();

  newMessage = '';

  onSendMessage() {
    if (this.newMessage.trim()) {
      this.sendMessage.emit(this.newMessage);
      this.newMessage = '';
    }
  }
}