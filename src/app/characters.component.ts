import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character'; 
import { Router } from '@angular/router';

@Component({
  selector: 'character',
  templateUrl: './characters.component.html',
  styleUrls: ['./app.component.css']  
})
export class Characters implements OnInit {
  title = 'Marvel';
  data: Date;
  tz: string; 
  hash = md5('1abcd1234');
  characters: Character[];
  character: Character;
  offset: number;
  ngOnInit(): void {
    this.getCharacters();
    console.log("oninit character");
    this.offset = 0;
  }
  constructor(private cFetch: Fetch, private router: Router) {

  }
  getCharacters(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();    
    this.cFetch.getCharacters(this.tz, (this.offset*20).toString()).then(characters => this.characters = characters);
  }

  gotoDetail(id: number): void {    
    this.router.navigate(['characterdetail', id]);
  }
  
  nextPage(): void {
    this.offset+=1;
    this.cFetch.getCharacters(this.tz, (this.offset*20).toString()).then(characters => this.characters = characters);
  }
}
