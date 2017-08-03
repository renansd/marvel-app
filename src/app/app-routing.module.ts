import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Characters } from './characters.component';
import { Comics } from './comics.component';
import { Events } from './events.component';
import { CharacterDetail } from './character-detail.component';
import { ComicDetail } from './comic-detail.component';
import { EventDetail } from './event-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: Characters },
  { path: 'comics', component: Comics },
  { path: 'events', component: Events },
  { path: 'characterdetail', component: CharacterDetail },
  { path: 'comicdetail', component: ComicDetail },
  { path: 'eventdetail', component: EventDetail }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }