import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character'; 

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
  ngOnInit(): void {
    this.getCharacters();
    console.log("oninit character");
  }
  constructor(private cFetch: Fetch) {

  }
  getCharacters(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getCharacters(this.tz).then(characters => this.characters = characters);
  }  
}
