import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // il servizio singleton messageService è iniettato automaticamente alla costruzione
  // viene creato pubblico in modo da poterlo bindare nell'html
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
