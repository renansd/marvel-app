import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Fetch } from './fetch.service';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Characters } from './characters.component';
import { Comics } from './comics.component';
import { Events } from './events.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    Characters,
    Comics,
    Events
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule	
  ],
  providers: [Fetch],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
