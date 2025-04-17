import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import * as XLSX from 'xlsx';
import * as Encoding from 'encoding-japanese';

@Component({
  selector: 'app-wine-new',
  templateUrl: './wine-new.component.html',
  styleUrls: ['./wine-new.component.css'],
})
export class WineNewComponent {
  wine: any;
  error: string = '';
  data: any[] = [];
  constructor(private route: ActivatedRoute, private service: ServiceService) {}

  ngOnInit() {
    if (history.state.wine) {
      this.wine = history.state.wine;
    } else {
      this.wine = {
        wine_name: '',
        type: '',
        region: '',
        denomination: '',
        menu_name: '',
        company: '',
        vine: '',
        year: '',
        reseller: '',
        price: '',
        sciolze_vinery: '',
        tastuma_vinery: '',
        service_temp: '',
        fridge_temp: '',
        fridge_type: '',
      };
    }
  }

  submit() {
    console.log(this.wine);
    this.error = '';
    if (this.isWineComplete(this.wine)) {
      if (this.wine.id) {
        this.service
          .editWine(this.replaceApostrophes(this.wine))
          .subscribe((data) => {});
      } else {
        this.service
          .saveNewWine(this.replaceApostrophes(this.wine))
          .subscribe((data) => {});
      }
    } else {
      this.error = 'Campi mancanti!';
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const bytes = new Uint8Array(arrayBuffer);

      const detectedEncoding = Encoding.detect(bytes) || 'UTF8'; // fallback

      const text = Encoding.convert(bytes, {
        from: detectedEncoding as Encoding.Encoding, // forza cast
        to: 'UNICODE',
        type: 'string',
      });

      const wb: XLSX.WorkBook = XLSX.read(text, { type: 'string' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      let data: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

      data = this.replaceApostrophes(data);

      this.service.uploadCsv(data).subscribe({
        next: (res) => console.log('✅ Upload completato', res),
        error: (err) => {
          console.error('❌ Errore upload', err);
          this.error = "Errore durante l'upload";
        },
      });
    };

    reader.readAsArrayBuffer(file); // IMPORTANTE: leggere come array buffer
  }

  replaceApostrophes(json: any): any {
    let jsonString = JSON.stringify(json);
    jsonString = jsonString.replace(/'/g, "''");
    return JSON.parse(jsonString);
  }

  isWineComplete(wine: any): boolean {
    for (const key in wine) {
      if (wine[key] === '') {
        return false;
      }
    }
    return true;
  }
}
