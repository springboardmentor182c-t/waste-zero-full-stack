import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Message {
  id: string;
  sender_id: string;
  sender: string;
  preview: string;
  date: string;
  avatar: string;
}

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-list.html',
  styleUrls: ['./message-list.css']
})
export class MessageListComponent {
  @Input() darkMode = false;
  @Input() messages: Message[] = [];
  @Input() selectedMessage: Message | null = null;
  @Output() messageSelect = new EventEmitter<Message>();

  searchText = '';

  onSelectMessage(message: Message) {
    this.messageSelect.emit(message);
  }
}