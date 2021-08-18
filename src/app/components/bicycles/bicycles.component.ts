import { Component, OnInit } from '@angular/core';
import { TestApiService } from '../../test-api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-bicycles',
  templateUrl: './bicycles.component.html',
  styleUrls: ['./bicycles.component.scss']
})
export class BicyclesComponent implements OnInit {
  bicycles: any;
  constructor(private api: TestApiService, private router: Router) { 
  }

  ngOnInit(): void {
    this.api.apiBikeCall().subscribe((data) => {
      this.bicycles = data;
    });
  }

  onSelect(bike: { id: number, parts: [number], imgUrls: [string], name: string  }){
    const navigationExtras: NavigationExtras = {
      state: {
        id: bike.id,
        parts: bike.parts,
        imgUrls: bike.imgUrls,
        name: bike.name,
      }
    }
    this.router.navigate(['/bicycles', bike.id], navigationExtras);
  }
}
