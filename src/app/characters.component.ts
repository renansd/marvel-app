import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { md5 } from './md5';
import { Fetch } from './fetch.service';
import { Character } from './character';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, NavigationCancel, Params } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/debounceTime';

@Pipe({ name: 'indexCharacter' })
export class IndexCharacter implements PipeTransform {
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
  oldOffset: number;
  offset: number;
  pastLetter: string;
  initialLetter: string;
  subscription: any;
  @ViewChild('filterForm') filterForm: NgForm;
  alphabet: string[] = ['*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
  ngOnInit(): void {
    this.getCharacters();
    console.log(this.filterForm.valueChanges);
    this.subscription = this.filterForm.valueChanges.debounceTime(0);
    this.subscription.subscribe(() => {
      this.render();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
  getCharacters(): void {
    this.data = new Date();
    this.tz = this.data.getTime().toString();
    this.cFetch.getCharacters(this.tz, this.offset * 100, this.initialLetter).then(characters => this.characters = characters);
  }

  gotoDetail(id: number): void {
    this.router.navigate(['characterdetail'], {
      queryParams: { id: id }
    });
  }

  render(): void {
    if (this.pastLetter != this.initialLetter) {
      this.pastLetter = this.initialLetter;
      this.offset = 0;
      this.router.navigate(['characters'], {
        queryParams: { off: this.offset, ini: this.initialLetter }
      });
      this.getCharacters();
    } else {
      if (this.oldOffset != this.offset) {
        this.oldOffset = this.offset;
        this.router.navigate(['characters'], {
          queryParams: { off: this.offset, ini: this.initialLetter }
        });
        this.getCharacters();
      }

    }
    console.log('off=' + this.offset + "&ini=" + this.initialLetter + "&PASTELETTER=" + this.pastLetter);
  }
}
