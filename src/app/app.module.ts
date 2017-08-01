import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Fetch } from './fetch.service';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Characters } from './characters.component';
import { Comics } from './comics.component';
import { Events } from './events.component';
import { CharacterDetail } from './character-detail.component';
import { ComicDetail } from './comic-detail.component';
import { EventDetail } from './event-detail.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PipeModule }    from './pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    Characters,
    Comics,
    Events,
    CharacterDetail,
    ComicDetail,
    EventDetail
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PipeModule.forRoot()	
  ],
  providers: [Fetch],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
