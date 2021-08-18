import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TestApiService } from '../../test-api.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  parts: any;
  constructor(private api: TestApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.apiPartCall().subscribe((data) => {
      this.parts = data;
    });
  }

  onSelect(part: {storeId: number, compatibleBikes: [number], imgUrls: [string], description: string, name: string}){
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
