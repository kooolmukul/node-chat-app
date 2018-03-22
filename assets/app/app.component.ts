import { Component, OnInit } from '@angular/core';
import { ChatMessageService } from './chat/chat.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ChatMessageService],
})
export class AppComponent{

}