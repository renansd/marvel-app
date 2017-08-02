import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params } from '@angular/router';
import { Location } from '@angular/common';
import { URLSearchParams, } from '@angular/http';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'characterdetail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./app.component.css']
})
export class CharacterDetail implements OnInit {
  title = 'Marvel';
  data: Date;
  tz: string;
  character: any = {};
  id: string;
  imgPath: string;
  statusSeries: boolean;
  statusDescription: boolean;
  size = '/portrait_xlarge.';
  ngOnInit(): void {
    this.getCharacters();
    console.log("OLHA AQUI <<<<<<<<<<>>>>>>>>>" + this.id);
  }
  constructor(private cFetch: Fetch,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      this.statusSeries = true;
      this.statusDescription = true;
    });
  }
  getCharacters(): void {
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getCharacter(this.tz, this.id).then(character => {
      this.character = character;      
      if (this.character[0].description == undefined) {        
        this.statusDescription = false;
      }      
      if (this.character[0].series == undefined) {
        this.statusSeries = false;
      }      
    });
  }
}
