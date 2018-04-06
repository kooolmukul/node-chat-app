import { Component, OnInit } from '@angular/core';
import { ChatMessageService } from './chat/chat.service';
import { AuthService } from './login/login.service';
import { TaskService } from './task/task.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ChatMessageService,AuthService,TaskService],
})
export class AppComponent{

}