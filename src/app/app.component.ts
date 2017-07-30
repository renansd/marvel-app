import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/characters" routerLinkActive="active">Characters</a>
            <a routerLink="/comics" routerLinkActive="active">Comics</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Marvel';
    /*    
    <a routerLink="/events" routerLinkActive="active">Events</a>
    */
}
