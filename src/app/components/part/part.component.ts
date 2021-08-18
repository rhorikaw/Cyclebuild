import { Component, ViewEncapsulation } from '@angular/core';
import { TestApiService } from '../../test-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BikeSelectComponent } from '../bike-select/bike-select.component';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard
} from 'swiper/core';
import { PartImageComponent } from '../part-image/part-image.component';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard])

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartComponent {
  id:number = -1;
  compatibleBikes!:[number];
  compatBikeStr!: string[];
  mainImgUrl!: string;
  subImgUrls!: [string];
  description!: string;
  name!: string;
  constructor(private api: TestApiService, 
    private route: Router, 
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog) { 
    const nav = this.route.getCurrentNavigation();
    if(nav && nav.extras !== undefined && nav.extras.state !== undefined){
      this.id = nav.extras.state.id;
      this.compatibleBikes = nav.extras.state.compatibleBikes;
      this.mainImgUrl = nav.extras.state.imgUrls[0];
      this.subImgUrls = nav.extras.state.imgUrls.slice(1);
      this.description = nav.extras.state.description;
      this.name = nav.extras.state.name;
      this.compatBikeStr = this.convertIdToName();
    } else{
      let id = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');
      this.api.apiPartIdCall(id).subscribe((data:any) => {
        this.id = data[0].storeId;
        this.compatibleBikes = data[0].compatibleBikes;
        this.mainImgUrl = data[0].imgUrls[0];
        this.subImgUrls = data[0].imgUrls.slice(1);
        this.description = data[0].description;
        this.name = data[0].name;
        this.compatBikeStr = this.convertIdToName();
      })
    }
  }


  convertIdToName(){
    let nameArr: string[] = [];
    this.api.apiMultBikeIdCall(this.compatibleBikes).subscribe((data:any) => {
      for(let bike of data){
        nameArr.push(bike.name);
      }
    })
    return nameArr; 
  }

  onCreateDialog(){
    this.dialog.open(BikeSelectComponent, {
      data: {
        name: this.name,
        id: this.id,
        displayImgUrl: this.mainImgUrl,
        compatibleBikes: this.compatibleBikes
      }
    });
  }

  onCreateImageDialog(index: number){
    let imgList = [];
    imgList.push(this.mainImgUrl);
    imgList.push(...this.subImgUrls);
    this.dialog.open(PartImageComponent, {
      data: {
        imgList: imgList,
        currentIndex: index
      },
      panelClass: 'custom-modalbox'
    });
  }

}
