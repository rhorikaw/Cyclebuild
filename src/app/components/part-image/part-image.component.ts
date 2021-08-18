import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-part-image',
  templateUrl: './part-image.component.html',
  styleUrls: ['./part-image.component.scss']
})
export class PartImageComponent implements OnInit {
  imgList: string[];
  currIndex: number;
  constructor(private dialogRef: MatDialogRef<PartImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      console.log(data);
      this.imgList = data.imgList;
      this.currIndex = data.currentIndex;
    }

  ngOnInit(): void {
  }

  onClickImageDialog(url: string) {
    this.currIndex = this.imgList.indexOf(url);
  }

  incrementIndex() {
    this.currIndex++;
  }

  decrementIndex() {
    this.currIndex--;
  }

  close() {
    this.dialogRef.close();
  }

}
