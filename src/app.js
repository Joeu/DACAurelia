import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

var baseUrl = 'http://localhost:8080/bootwildfly';

@inject(HttpClient)
export class App {

  constructor(http) {
    this.heading = "DACA - Dirlididi";
    http.configure(config => {
      config
      .withBaseUrl(baseUrl)
      .withDefaults({
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'Fetch'
        }
      });
  });

    this.http = http;
  }

  configureRouter(config, router){
    config.title = 'Dirlididi';

    config.map([
      { route: ['','daca'],  name: 'daca',
        moduleId: './daca',  nav: true, title:'Daca' },
      { route: 'problems',  name: 'problems',
        moduleId: './problems',    nav: true, title:'Problems' },
      { route: 'stats',  name: 'stats',
        moduleId: './stats',    nav: true, title:'Stats' }
    ]);

    this.router = router;
  }

}
