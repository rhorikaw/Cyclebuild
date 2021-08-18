import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PartsComponent } from './components/parts/parts.component';
import { HomeComponent } from './components/home/home.component';
import { BikeComponent } from './components/bike/bike.component';
import { PartComponent } from './components/part/part.component';
import { BikeSelectComponent } from './components/bike-select/bike-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PartAddConfirmationComponent } from './components/part-add-confirmation/part-add-confirmation.component';
import { PartExistsComponent } from './components/part-exists/part-exists.component';
import { PartImageComponent } from './components/part-image/part-image.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// import { BicyclesComponent } from './bicycles/bicycles.component';
const MaterialComponents = [
  MatDialogModule,
  MatIconModule
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    PartsComponent,
    HomeComponent,
    BikeComponent,
    PartComponent,
    BikeSelectComponent,
    PartAddConfirmationComponent,
    PartExistsComponent,
    PartImageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BikeSelectComponent]
})
export class AppModule { }
