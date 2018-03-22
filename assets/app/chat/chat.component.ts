import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as io from "socket.io-client";
import {ChatMessageService} from './chat.service';
import {Message} from './chat.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    myForm: FormGroup;
    messages : Message[] = []; 
    private socket: io.Socket;
    url = 'http://localhost:3000/';
    
    constructor(private chatService : ChatMessageService){};

    onSubmit(){
        this.socket.emit('createMessage', {
            from: 'User',
            text: this.myForm.value.message
        }, (data)=> {
            this.myForm.reset();
        });

    }

    sendLocation(element){

        if (!navigator.geolocation) {
            return alert('Geolocation not supported by Browser');
        }        
        element.textContent = 'Sending location...';
        element.disabled = true;

        navigator.geolocation.getCurrentPosition( (position) => {
            element.textContent = 'Send location';
            element.disabled = false;
            this.socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },  ()=> {
            element.textContent = 'Send location';
            element.disabled = false;
            alert('Unable to fetch Location');
        });
    }
    

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { 
            console.log(err);
        }                 
    }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    ngOnInit(){
        this.scrollToBottom();
        this.messages = this.chatService.getMessages();

        this.myForm = new FormGroup({message :  new FormControl(null)});
        this.socket = io();
         this.socket.on('connect', function() {
             console.log('Connected to Server');
         } );

         this.socket.on('disconnect', () => {
            console.log('Server Disconnected');
        });

        this.socket.on('newMessage', (message) =>{
            console.log('New Message', message);
            this.chatService.addMessage(message);
            
        });


        this.socket.on('newLocationMessage',  (message)=> {
            this.chatService.addMessage(message);
        });
     }
    
    
}