import { Component } from '@angular/core';
import { TestApiService } from '../../test-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikeComponent {
  id:number = -1;
  parts:number[] = [];
  partsData!:any[];
  mainImgUrl!: string;
  subImgUrls!:[string];
  name!:string;

  constructor(private api: TestApiService, private route: Router, private activeRoute: ActivatedRoute) { 
    const nav = this.route.getCurrentNavigation();
    if(nav && nav.extras !== undefined && nav.extras.state !== undefined){
      this.id = nav.extras.state.id;
      this.parts = nav.extras.state.parts;
      this.mainImgUrl = nav.extras.state.imgUrls[0];
      this.subImgUrls = nav.extras.state.imgUrls.slice(1);
      this.name = nav.extras.state.name;
      if(this.parts.length > 0){
        this.api.apiMultPartIdCall(this.parts).subscribe((data:any) => {
          this.partsData = data;
        })
      }
    } else {
      let id = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '' );
      this.api.apiBikeIdCall(id).subscribe((data: any) => {
      this.id = data[0].storeId;
      this.parts = data[0].parts;
      this.mainImgUrl = data[0].imgUrls[0];
      this.subImgUrls = data[0].imgUrls.slice(1);
      this.name = data[0].name;

      if(this.parts.length > 0){
        this.api.apiMultPartIdCall(this.parts).subscribe((data:any) => {
          this.partsData = data;
        })
      }
      })
    }
    
  }


  removePart(index:number){
    this.parts.splice(index,1);
    this.partsData.splice(index,1);
    this.api.apiUpdateBikeParts(this.id, this.parts).subscribe ( (data:any) => {
    });;
  }

}
