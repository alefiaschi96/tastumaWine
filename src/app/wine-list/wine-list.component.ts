import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service'; 

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent {

  wines: any[] = [];
  types: any[] = [];
  selectedType: string = "";
  wineName: string = "";
  selectedWine: any;

  constructor(private service: ServiceService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
    this.getWineTypes();
  }

  getData() {
    this.service.getWines().subscribe(data => {
      this.wines = data;
    });
  }

  openDetail(wine: any) {
    if (this.selectedWine == wine)
      this.selectedWine = null
    else
      this.selectedWine = wine;
  }


  goToDetail(wine: any) {
    this.router.navigate(['/wine'], { state: { wine } });
  }

  getWineTypes() {
    this.service.getWinesTypes().subscribe(data => {
      this.types = data
    })
  }

  getWineFromType(type: string) {
    this.selectedType = type;
    this.service.getWineFromType(type).subscribe(data => {
      this.wines = data;
    })
  }

  removeTypeFilter() {
    this.selectedType = "";
    this.getData();
  }

  getWineFromName(data: any) {
    if (this.wineName) {
      this.service.getWineFromName(this.wineName).subscribe(data => {
        this.wines = data;
      })
    } else {
      if (this.selectedType) {
        this.getWineFromType(this.selectedType);
      } else {
        this.getData();
      }
    }
  }

}
