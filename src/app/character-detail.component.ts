import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
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
	character: Character[];
	id: number;
	imgPath: string;
	size = '/portrait_xlarge.';  
  ngOnInit(): void {
    this.getCharacters();
    console.log("OLHA AQUI <<<<<<<<<<>>>>>>>>>" + this.id);    
  }
  constructor(private cFetch: Fetch,
    private route: ActivatedRoute,
    private location: Location) {
    this.route.params.subscribe(params => {
			this.id = +params['id'];
		});
  }
  getCharacters(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();    
		this.cFetch.getCharacter(this.tz, this.id).then(character => this.character = character);		
  }  
}
