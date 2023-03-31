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
  error: string = "";
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
  }

  submit() {
    console.log(this.wine)
    this.error = "";
    if (this.isWineComplete(this.wine)) {
      if (this.wine.id) {
        this.service.editWine(this.replaceApostrophes(this.wine)).subscribe(data => {
          console.log(data)
        })
      } else {
        this.service.saveNewWine(this.replaceApostrophes(this.wine)).subscribe(data => {
          console.log(data)
        })
      }
    } else{
      this.error = "Campi mancanti!"
    }
  }

  replaceApostrophes(json: any): any {
    let jsonString = JSON.stringify(json);
    console.log(jsonString)
    jsonString = jsonString.replace(/'/g, "''");
    console.log(jsonString)
    return JSON.parse(jsonString);
  }

  isWineComplete(wine: any): boolean {
    for (const key in wine) {
      if (wine[key] === "") {
        return false;
      }
    }
    return true;
  }
}
