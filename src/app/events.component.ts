import { Component, OnInit, ViewChild } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Event } from './event';
import {NgForm} from '@angular/forms'; 
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params} from '@angular/router';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./app.component.css']  
})
export class Events implements OnInit {
  title = 'Marvel';
  data: Date;
  tz: string;   
  events: any = {};
  offset: number;
  pastLetter: string;
  initialLetter: string;
  subscription: any;
  @ViewChild('filterForm') filterForm: NgForm;
  alphabet: string[] = ['*', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Y','Z'];
  ngOnInit(): void {
    this.getEvents();
    this.subscription = this.filterForm.valueChanges.debounceTime(0);
    this.subscription.subscribe(() => {
      this.offset = 0;
      this.render();
    });    
  }
  constructor(private cFetch: Fetch, private router: Router) {

  }
  render(): void {
    console.log('off=' + this.offset + "&ini=" + this.initialLetter + "&PASTELETTER=" + this.pastLetter);
    if(this.pastLetter != this.initialLetter)
    {
      this.pastLetter = this.initialLetter;
      this.router.navigate(['events'], {
        queryParams: {off: this.offset, ini: this.initialLetter}      
      });
    }    
    this.getEvents();
  }
  getEvents(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getEvents(this.tz, (this.offset*20).toString(), this.initialLetter).then(events => this.events = events);
  }  
}
