import { Component, OnInit, ViewChild } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Comic } from './comic';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'indexComic' })
export class IndexComic implements PipeTransform {
  transform(value, args: string[]): any {
    let res: any = [];
    let limit = 100;
    let value2: number;
    if (value % 20 != 0) {
      value2 = Math.floor(value / limit) + 1;
    } else {
      value2 = Math.floor(value / limit);
    }
    for (let i = 0; i < value2; i++) {
      if (i == value2 - 1) {
        res.push({ off: i, range: (i * limit + 1) + '-' + value });
      } else {
        res.push({ off: i, range: (i * limit + 1) + '-' + ((i * limit) + limit) });
      }
    }
    return res;
  }
}

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
  alphabet: string[] = ['*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
  oldOffset: number;
  offset: number;
  pastLetter: string;
  initialLetter: string;
  subscription: any;
  @ViewChild('filterForm') filterForm: NgForm;
  ngOnInit(): void {
    this.getComics();
    this.subscription = this.filterForm.valueChanges.debounceTime(0);
    this.subscription.subscribe(() => {
      this.render();
    });
  }
  constructor(private cFetch: Fetch, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['off']) this.offset = params['off'];
      else this.offset = 0;
      if(params['ini']) this.initialLetter = params['ini'];
      else this.initialLetter = '*';
      this.pastLetter = this.initialLetter;
      this.oldOffset = this.offset;
    });
  }
  render(): void {
    if (this.pastLetter != this.initialLetter) {
      this.pastLetter = this.initialLetter;
      this.offset = 0;
      this.router.navigate(['comics'], {
        queryParams: { off: this.offset, ini: this.initialLetter }
      });
      this.getComics();
    } else {
      if (this.oldOffset != this.offset) {
        this.oldOffset = this.offset;
        this.router.navigate(['comics'], {
          queryParams: { off: this.offset, ini: this.initialLetter }
        });
        this.getComics();
      }

    }
    console.log('off=' + this.offset + "&ini=" + this.initialLetter + "&PASTELETTER=" + this.pastLetter);
  }
  getComics(): void {
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getComics(this.tz, this.offset * 100, this.initialLetter).then(comics => this.comics = comics);
  }
}
