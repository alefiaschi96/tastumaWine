import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './wine-list/wine-list.component';
import { WineNewComponent } from './wine-new/wine-new.component';

const routes: Routes = [
  { path: 'wine-list', component: WineListComponent },
  { path: 'wine', component: WineNewComponent },
  { path: '', component: WineListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',  useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
