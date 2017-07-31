import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character'; 
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
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
  characters: any = {};
  character: Character;
  offset: number;
  pastLetter: string;
  initialLetter: string;
  subscription: any;
  @ViewChild('filterForm') filterForm: NgForm;
  alphabet: string[] = ['*', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Y','Z'];
  ngOnInit(): void {
    this.getCharacters();
    console.log(this.filterForm.valueChanges);
    this.subscription = this.filterForm.valueChanges.debounceTime(0);
    this.subscription.subscribe(() => {
      this.offset = 0;
      this.render();
    });        
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }  
  constructor(private cFetch: Fetch, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      this.offset = params['off'];      
      this.initialLetter = params['ini'];
    });
  }
  getCharacters(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();    
    this.cFetch.getCharacters(this.tz, (this.offset*20).toString(), this.initialLetter).then(characters => this.characters = characters);
  }

  gotoDetail(id: number): void {    
    this.router.navigate(['characterdetail'], {
      queryParams: {id: id}      
    });
  }

  render(): void {
    console.log('off=' + this.offset + "&ini=" + this.initialLetter + "&PASTELETTER=" + this.pastLetter);
    //this.router.navigateByUrl('characters?off=' + this.offset + '&ini=' + this.initialLetter);
    //location.replace('characters?off=' + this.offset + '&ini=' + this.initialLetter);
    if(this.pastLetter != this.initialLetter)
    {
      this.pastLetter = this.initialLetter;
      this.router.navigate(['characters'], {
        queryParams: {off: this.offset, ini: this.initialLetter}      
      });
    }    
    this.getCharacters();
  } 
}
