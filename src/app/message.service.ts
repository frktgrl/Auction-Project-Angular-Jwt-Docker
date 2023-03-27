import { Injectable, OnInit } from '@angular/core';
declare var SockJS;
declare var Stomp;
import {environment} from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 // SOCKET_URL: 'http://localhost:8080/api/socket';
 const SOCKET_URL = 'http://localhost:8080/api/socket/';

@Injectable({
  providedIn: 'root'
})
export class MessageService{


  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
  }

  getAuctionBoard(): Observable<any> {
    return this.http.get(SOCKET_URL + 'socket', { responseType: 'text' });
  }

  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl =SOCKET_URL;
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message' , {}, message);
  }
}