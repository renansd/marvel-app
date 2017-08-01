import { NgModule }      from '@angular/core';
import { IndexCharacter } from './characters.component'
import { IndexComic } from './comics.component'
import { IndexEvent } from './events.component'

 @NgModule({
     imports:        [],
     declarations:   [IndexCharacter, IndexComic, IndexEvent],
     exports:        [IndexCharacter, IndexComic, IndexEvent],
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 } 