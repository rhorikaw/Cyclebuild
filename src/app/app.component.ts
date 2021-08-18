import { Component } from '@angular/core';
import { TestApiService } from './test-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CycleBuild';
  constructor(private api: TestApiService){

  }
  ngOnInit(){
    
  }
}
