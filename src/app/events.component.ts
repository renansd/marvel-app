import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Event } from './event'; 

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./app.component.css']  
})
export class Events implements OnInit {
  title = 'Marvel';
  data: Date;
  tz: string;   
  events: Event[];  
  ngOnInit(): void {
    this.getEvents();    
  }
  constructor(private cFetch: Fetch) {

  }
  getEvents(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getEvents(this.tz).then(events => this.events = events);
  }  
}
