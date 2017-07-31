import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { Characters }   from './characters.component';
import { Comics }   from './comics.component';
import { Events }   from './events.component';
import { CharacterDetail } from './character-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/characters?off=0&ini=*', pathMatch: 'full' },
  { path: 'characters', component: Characters },
  { path: 'comics', component: Comics },
  { path: 'events', component: Events },
  { path: 'characterdetail', component: CharacterDetail }  
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}