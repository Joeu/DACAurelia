import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

var baseUrl = 'http://localhost:8080/bootwildfly';

@inject(HttpClient)
export class Problem {

  constructor() {
    this.heading = "Problems";
  }


  getProblems(){
    httpClient.fetch(baseUrl + '/problem')
      .then(response => response.json())
  .then(data => {
      console.log(data);
    this.size = data.length;
    this.problems = data;
  });
  }

}
