import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-wine-new',
  templateUrl: './wine-new.component.html',
  styleUrls: ['./wine-new.component.css']
})
export class WineNewComponent {
  wine: any;
  error: string = "";
  data: any[] = [];
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
        })
      } else {
        this.service.saveNewWine(this.replaceApostrophes(this.wine)).subscribe(data => {
        })
      }
    } else {
      this.error = "Campi mancanti!"
    }
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.data[0] = ["type", "region", "denomination", "wine_name", "menu_name", "company", "vine", "year", "reseller", "price", "sciolze_vinery", "tastuma_vinery", "service_temp", "fridge_temp", "fridge_type"];
      this.onDownloadClick()
    };
    reader.readAsBinaryString(file);
  }

  onDownloadClick() {
    // Crea un nuovo foglio di lavoro con i dati aggiornati
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    // Crea un nuovo libro di lavoro con il foglio di lavoro
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Converte il libro di lavoro in un file CSV
    const csv: string = XLSX.utils.sheet_to_csv(ws);

    // Crea un nuovo oggetto Blob con il contenuto del file CSV
    const blob: Blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const file = new File([blob], 'elenco.csv', { type: 'text/plain' });

    this.service.uploadCsv(file).subscribe(data => {
      console.log(data)
      this.error = "Aggiornamento completato!"
    })
  }

  replaceApostrophes(json: any): any {
    let jsonString = JSON.stringify(json);
    jsonString = jsonString.replace(/'/g, "''");
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
