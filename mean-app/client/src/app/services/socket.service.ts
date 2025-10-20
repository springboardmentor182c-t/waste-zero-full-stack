import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.SERVER_URL, {
      autoConnect: false
    });
  }

  // Connect and join as user
  connect(userId: string): void {
    if (!this.socket.connected) {
      this.socket.connect();
      this.socket.emit('user:join', userId);
      console.log('Socket connected for user:', userId);
    }
  }

  // Disconnect
  disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
      console.log('Socket disconnected');
    }
  }

  // Send message
  sendMessage(sender_id: string, receiver_id: string, content: string): void {
    this.socket.emit('message:send', {
      sender_id,
      receiver_id,
      content
    });
  }

  // Listen for incoming messages
  onMessageReceive(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message:receive', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Listen for sent message confirmation
  onMessageSent(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message:sent', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Typing indicators
  startTyping(sender_id: string, receiver_id: string): void {
    this.socket.emit('typing:start', { sender_id, receiver_id });
  }

  stopTyping(sender_id: string, receiver_id: string): void {
    this.socket.emit('typing:stop', { sender_id, receiver_id });
  }

  onTypingShow(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('typing:show', (userId: string) => {
        observer.next(userId);
      });
    });
  }

  onTypingHide(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('typing:hide', (userId: string) => {
        observer.next(userId);
      });
    });
  }

  // Mark messages as read
  markAsRead(sender_id: string, receiver_id: string): void {
    this.socket.emit('message:read', { sender_id, receiver_id });
  }

  // Listen for user online/offline status
  onUserOnline(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('user:online', (userId: string) => {
        observer.next(userId);
      });
    });
  }

  onUserOffline(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('user:offline', (userId: string) => {
        observer.next(userId);
      });
    });
  }

  // Check connection status
  isConnected(): boolean {
    return this.socket.connected;
  }
}