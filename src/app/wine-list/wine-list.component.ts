import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent {

  wines = [];
  selectedWine: any;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getWines().subscribe(data => {
      this.wines = data;
    });
  }

  openDetail(wine: any) {
    console.log(wine)
    if (this.selectedWine == wine)
      this.selectedWine = null
    else
      this.selectedWine = wine;
  }

  goToDetail(wine: any) {
    this.router.navigate(['/wine'], { state: { wine } });
  }

}
