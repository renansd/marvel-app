import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Event } from './event';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params} from '@angular/router';
import { Location } from '@angular/common';
import { URLSearchParams, } from '@angular/http';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'eventdetail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./app.component.css']  
})
export class EventDetail implements OnInit {
    title = 'Marvel';
    data: Date;
    tz: string;   
    event: any = {};
    id: string;
    imgPath: string;
    size = '/portrait_xlarge.';  
  ngOnInit(): void {
    this.getEvent();
    console.log("OLHA AQUI <<<<<<<<<<>>>>>>>>>" + this.id);    
  }
  constructor(private cFetch: Fetch,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {    
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(params['id']);
    });
  }
  getEvent(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();   
		this.cFetch.getEvent(this.tz, this.id).then(event => this.event = event);		
  }  
}
