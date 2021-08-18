import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TestApiService } from '../../test-api.service';
import { PartAddConfirmationComponent } from '../part-add-confirmation/part-add-confirmation.component';
import { PartExistsComponent } from '../part-exists/part-exists.component';

@Component({
  selector: 'app-bike-select',
  templateUrl: './bike-select.component.html',
  styleUrls: ['./bike-select.component.scss']
})
export class BikeSelectComponent implements OnInit {
  name:string;
  partId:number;
  imgUrl:string;
  compatBikes:[number];
  searchTerm:string = "";
  bikeSearchMatch:any;
  constructor(  private api: TestApiService, 
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<BikeSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { 
    this.name = data.name;
    this.partId = data.id;
    this.imgUrl = data.displayImgUrl;
    this.compatBikes = data.compatibleBikes;
    this.bikeSearchMatch = [];
  }

  ngOnInit(): void {
  }

  onChange(event:any){
    this.searchTerm = event.target.value;
    this.api.apiBikeNameCall(this.searchTerm).subscribe( (data:any) => {
      this.bikeSearchMatch = data;
    });
  }

  onClick(id:number, parts:[number]){
    if(parts.includes(this.partId)){
      this.dialogRef.close();
      this.dialog.open(PartExistsComponent);
    }else {
      let newParts = parts.slice(0)
      newParts.push(this.partId);
      this.dialogRef.close();
      this.api.apiUpdateBikeParts(id, newParts).subscribe ( (data:any) => {
      });
      this.dialog.open(PartAddConfirmationComponent);
    }
  }
}
