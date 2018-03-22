import {Message} from './chat.model';

export class ChatMessageService {
    private messages: Message[] = [];
    private users = ['a'];

    addMessage(msg){
        const message = new Message(msg.from,msg.text,msg.createdAt,msg.type)
        this.messages.push(message)
    }

    getMessages(){
        return this.messages;   
    }

    updateUserList(users){
        
        this.users = users;
    }

    getUserList(){
        return this.users;
    }
}