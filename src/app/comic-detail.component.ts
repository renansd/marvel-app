import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Comic } from './comic';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params} from '@angular/router';
import { Location } from '@angular/common';
import { URLSearchParams, } from '@angular/http';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'comicdetail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./app.component.css']  
})
export class ComicDetail implements OnInit {
    title = 'Marvel';
    data: Date;
    tz: string;   
    comic: any = {};
    id: string;    
    imgPath: string;    
    size = '/portrait_xlarge.';  
  ngOnInit(): void {
    this.getComic();
    console.log("OLHA AQUI <<<<<<<<<<>>>>>>>>>" + this.id);    
  }
  goBack(): void {
		this.location.back();
	}
  constructor(private cFetch: Fetch,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {    
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
  getComic(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();   
		this.cFetch.getComic(this.tz, this.id).then(comic => this.comic = comic);		
  }  
}
