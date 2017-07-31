import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character'; 
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params} from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
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
  initialLetter: string = '*';
  endEvent: Subject<any>;
  @ViewChild('filterForm') filterForm: NgForm;
  alphabet = [{letter: 'A'}, ]
  ngOnInit(): void {
    this.endEvent = new Subject<any>();     
    this.filterForm.valueChanges
    .filter(() => this.filterForm.valid)
    .takeUntil(this.endEvent)
    .debounceTime(0)
    .bufferTime(0)         
    .subscribe(() => {      
      this.offset = 0;
      this.render();
    });
    this.getCharacters();         
  }
  ngOnDestroy(): void {
    if(this.endEvent) {
      this.endEvent.next();
    }
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
    //console.log('off=' + this.offset + "&ini=" + this.initialLetter);
    console.log("hello");
    //this.router.navigateByUrl('characters?off=' + this.offset + '&ini=' + this.initialLetter);
    //location.replace('characters?off=' + this.offset + '&ini=' + this.initialLetter);
    /*this.router.navigate(['characters'], {
      queryParams: {off: this.offset, ini: this.initialLetter}      
    });*/
    //this.nextPage();
  }
  
  nextPage(): void {    
    this.cFetch.getCharacters(this.tz, (this.offset*20).toString(), this.initialLetter).then(characters => this.characters = characters);
  }
}
