import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { routing } from "./app.routing";

@NgModule({
    declarations: [
        AppComponent, ChatComponent,LoginComponent
    ],
    imports: [BrowserModule,FormsModule, 
        ReactiveFormsModule, routing ],
    bootstrap: [AppComponent]
})
export class AppModule {

}