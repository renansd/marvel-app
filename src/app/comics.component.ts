import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Comic } from './comic'; 

@Component({
  selector: 'comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./app.component.css']  
})
export class Comics implements OnInit {
  title = 'Marvel';
  data: Date;
  tz: string;   
  comics: Comic[];  
  ngOnInit(): void {
    this.getComics();
  }
  constructor(private cFetch: Fetch) {

  }
  getComics(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getComics(this.tz).then(comics => this.comics = comics);
  }  
}
