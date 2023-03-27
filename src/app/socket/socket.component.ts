import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'src/app/message.service';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {


  content?: string;
  title = 'websocket-frontend';
  input;

  ngOnInit(): void {
    this.userService.getAuctionBoard().subscribe(data => {
      this.content = data;
      console.log('data:',data);
      console.log('getAuctionBoard');
    }, () => {
 
      err => {
        this.content = JSON.parse(err.error).message;
        
      }
    })
  }

  constructor(public messageService: MessageService, private userService: UserService) { }
  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.input);
      this.input = '';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
