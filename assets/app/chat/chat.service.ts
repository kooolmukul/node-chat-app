import {Message} from './chat.model';

export class ChatMessageService {
    private messages: Message[] = [];

    addMessage(msg){
        const message = new Message(msg.from,msg.text,msg.createdAt,msg.type)
        this.messages.push(message)
    }

    getMessages(){
        return this.messages;   
    }
}