import { NgModule }      from '@angular/core';
import { DemoNumber } from './characters.component'

 @NgModule({
     imports:        [],
     declarations:   [DemoNumber],
     exports:        [DemoNumber],
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 } 