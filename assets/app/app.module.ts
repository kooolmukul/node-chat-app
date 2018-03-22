import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";

@NgModule({
    declarations: [
        AppComponent, ChatComponent
    ],
    imports: [BrowserModule,FormsModule, 
        ReactiveFormsModule ],
    bootstrap: [AppComponent]
})
export class AppModule {

}