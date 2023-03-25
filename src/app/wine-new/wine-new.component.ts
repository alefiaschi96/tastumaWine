import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wine-new',
  templateUrl: './wine-new.component.html',
  styleUrls: ['./wine-new.component.css']
})
export class WineNewComponent {
  wine: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (history.state.wine) {
      this.wine = history.state.wine;
    } else {
      this.wine = {
        company: "",
        denomination: "",
        fridge_temp: "",
        fridge_type: "",
        menu_name: "",
        price: "",
        region: "",
        reseller: "",
        sciolze_vinery: "",
        service_temp: "",
        tastuma_vinery: "",
        type: "",
        vine: "",
        wine_name: "",
        year: ""
      }
    }
    console.log(this.wine);
  }

  submit(){
    console.log(this.wine)
  }
}
