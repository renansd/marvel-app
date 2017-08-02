import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div style="max-height:100%">    
    
        <body class="skin-blue layout-top-nav" background="/assets/background2.jpg" background-repeat="no repeat">
            <div style="float:none;text-align: center"><img src="../assets/logom.png" align="middle"></div>
            <header class="main-header">
                <nav class="navbar navbar-default" style="float:none;text-align: center">
                <div style="display: inline-block;float:none; position: center; text-align: center;margin: auto">
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <ul class="nav navbar-nav" style="float:none; text-align: center;margin: auto">
                        <li><a routerLink="/characters" routerLinkActive="active"><font size="5"><b>Characters</b></font></a></li>
                        <li><a routerLink="/comics" routerLinkActive="active"><font size="5"><b>Comics</b></font></a></li>
                        <li><a routerLink="/events" routerLinkActive="active"><font size="5"><b>Events</b></font></a></li>                         
                    </ul>           
                    <!-- /.navbar-collapse -->
                </div>
                <!-- /.container-fluid -->
                </nav>
            </header>
            <div style="position: center">
            <router-outlet></router-outlet>
            </div>
        </body>
    </div>       
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Marvel';    
}
