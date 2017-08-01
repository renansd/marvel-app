import { Component, OnInit, ViewChild } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Comic } from './comic'; 
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params} from '@angular/router';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./app.component.css']  
})
export class Comics implements OnInit {
  title = 'Marvel';
  data: Date;
  tz: string;   
  comics: any = {};
  alphabet: string[] = ['*', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Y','Z'];
  offset: number;
  pastLetter: string;
  initialLetter: string;
  subscription: any;
  @ViewChild('filterForm') filterForm: NgForm;
  ngOnInit(): void {
    this.getComics();
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
      this.router.navigate(['comics'], {
        queryParams: {off: this.offset, ini: this.initialLetter}      
      });
    }    
    this.getComics();
  }
  getComics(): void{
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getComics(this.tz, (this.offset*20).toString(), this.initialLetter).then(comics => this.comics = comics);
  }  
}
