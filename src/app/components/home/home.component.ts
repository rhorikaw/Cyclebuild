import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TestApiService } from '../../test-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bicycles: any;
  bikeIds: number[] = [];
  parts: any = [];
  constructor(private api: TestApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.apiBikeCall().subscribe((data) => {
      this.bicycles = data;
      for(let bike of this.bicycles){
        this.bikeIds.push(bike.storeId);
      }
    })
    this.api.apiPartCall().subscribe((data:any) => {
      for(let part of data){
        for(let bike of this.bicycles){
          if(part.compatibleBikes.indexOf(bike.storeId) > -1){
            if(bike.parts.indexOf(part.storeId) === -1){
              if(!this.parts.includes(part)){
                this.parts.push(part);
              }
            }
          }
        }
      }
    })
  }

  onBikeSelect(bike: { storeId: number, parts: [number], imgUrls: [string], name: string  }){
    const navigationExtras: NavigationExtras = {
      state: {
        id: bike.storeId,
        parts: bike.parts,
        imgUrls: bike.imgUrls,
        name: bike.name,
      }
    }
    this.router.navigate(['/bicycles', bike.storeId], navigationExtras);
  }

  onPartSelect(part: {storeId: number, compatibleBikes: [number], imgUrls: [string], description: string, name: string}){
    const navigationExtras : NavigationExtras = {
      state: {
        id: part.storeId,
        compatibleBikes: part.compatibleBikes,
        imgUrls: part.imgUrls,
        description: part.description,
        name: part.name
      }
    }
    this.router.navigate(['/parts', part.storeId], navigationExtras);
  }

}
