import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from '@angular/router';
import * as io from "socket.io-client";
import { ChatMessageService } from './chat.service';
import { AuthService } from '../login/login.service';
import { Message } from './chat.model';
import { User } from '../login/user.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    room: string;
    user: string;
    currentUser : User;
    private sub: any;

    myForm: FormGroup;
    messages: Message[] = [];
    users = [];
    private socket: io.Socket;
    url = 'http://localhost:3000/';
    panelOpenState: boolean = false;

    constructor(private chatService: ChatMessageService, private route: ActivatedRoute, private router : Router,private authService: AuthService) {

    };




    onSubmit() {
        if (this.myForm.valid) {
            this.socket.emit('createMessage', {
                text: this.myForm.value.message
            }, (data) => {
                this.myForm.reset();
            });
        }
    }


    logout(){
        this.authService.logoutUser();
        this.router.navigateByUrl('/');
    }

    

    sendLocation(element) {

        if (!navigator.geolocation) {
            return alert('Geolocation not supported by Browser');
        }
        element.disabled = true;

        navigator.geolocation.getCurrentPosition((position) => {
            element.disabled = false;
            this.socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, () => {
            element.disabled = false;
            alert('Unable to fetch Location');
        });
    }


    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.log(err);
        }
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnInit() {

        this.currentUser =  this.authService.getUserInfo();
        this.room  = 'backChodVilla';
        this.user = this.currentUser.firstName;

        // this.sub = this.route.params.subscribe(params => {
        //     this.room = params['room'];
        //     this.user = params['user'];
        //     console.log(this.room, this.user);
        // });

        this.scrollToBottom();

        this.messages = this.chatService.getMessages();


        this.myForm = new FormGroup({
            message: new FormControl(null, [
                Validators.required,
            ])
        });


        this.socket = io();


        this.socket.on('connect', () => {
            console.log('Connected to Server');
            this.socket.emit('join', { room: this.room, user: this.user }, (data) => {
                this.users = this.chatService.getUserList();
                console.log('users->', this.users);

            })
        });


        this.socket.on('disconnect', () => {
            console.log('Server Disconnected');
        });

        this.socket.on('updateUserList', (userlist) => {

            this.chatService.updateUserList(userlist);
            this.users = this.chatService.getUserList();
        });
        this.socket.on('newMessage', (message) => {
            console.log('New Message', message);
            console.log(this.socket.id);

            this.chatService.addMessage(message);

        });


        this.socket.on('newLocationMessage', (message) => {
            this.chatService.addMessage(message);
        });


    }


}