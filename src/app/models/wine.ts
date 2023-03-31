export class Wine {
    id: number;
    wine_name: string;
    type: string;
    region: string;
    denomination: string;
    menu_name: string;
    company: string;
    vine: string;
    year: string;
    reseller: string;
    price: number;
    sciolze_vinery: number;
    tastuma_vinery: number;
    service_temp: string;
    fridge_temp: string;
    fridge_type: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.wine_name = data.wine_name;
      this.type = data.type;
      this.region = data.region;
      this.denomination = data.denomination;
      this.menu_name = data.menu_name;
      this.company = data.company;
      this.vine = data.vine;
      this.year = data.year;
      this.reseller = data.reseller;
      this.price = data.price;
      this.sciolze_vinery = data.sciolze_vinery;
      this.tastuma_vinery = data.tastuma_vinery;
      this.service_temp = data.service_temp;
      this.fridge_temp = data.fridge_temp;
      this.fridge_type = data.fridge_type;
    }
  }