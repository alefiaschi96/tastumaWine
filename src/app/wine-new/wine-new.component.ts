import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-wine-new',
  templateUrl: './wine-new.component.html',
  styleUrls: ['./wine-new.component.css']
})
export class WineNewComponent {
  wine: any;
  constructor(private route: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    if (history.state.wine) {
      this.wine = history.state.wine;
    } else {
      this.wine = {
        wine_name: "",
        type: "",
        region: "",
        denomination: "",
        menu_name: "",
        company: "",
        vine: "",
        year: "",
        reseller: "",
        price: "",
        sciolze_vinery: "",
        tastuma_vinery: "",
        service_temp: "",
        fridge_temp: "",
        fridge_type: "",
      }
    }
    console.log(this.wine);
  }

  submit() {
    console.log(this.wine)
    if (this.wine.id) {
      this.service.editWine(this.wine).subscribe(data => {
        console.log(data)
      })
    } else {
      this.service.saveNewWine(this.wine).subscribe(data => {
        console.log(data)
      })
    }
  }
}
