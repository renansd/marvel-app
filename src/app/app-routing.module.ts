import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { Characters }   from './characters.component';
import { Comics }   from './comics.component';
import { Events}   from './events.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: Characters},
  { path: 'comics', component: Comics},
  { path: 'events', component: Events}  
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}