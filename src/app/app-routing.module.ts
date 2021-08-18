import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BicyclesComponent } from './components/bicycles/bicycles.component';
import { PartsComponent } from './components/parts/parts.component';
import { HomeComponent } from './components/home/home.component';
import { BikeComponent } from './components/bike/bike.component';
import { PartComponent } from './components/part/part.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bicycles', component: BicyclesComponent},
  {path: 'bicycles/:id', component: BikeComponent},
  {path: 'parts', component: PartsComponent},
  {path: 'parts/:id', component: PartComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, BicyclesComponent, BikeComponent, PartsComponent, PartComponent];
