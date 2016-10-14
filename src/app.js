import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

var baseUrl = 'http://localhost:8080/bootwildfly';

@inject(HttpClient)
export class App {

  constructor(){
    this.heading = "DACA - Dirlididi";
  }


  getStats(){
    httpClient.fetch(baseUrl + '/stats')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.problems = data.Problems;
        this.users = data.Users;
        this.submissions = data.Submissions;
      });
  }

}
