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

      // Ottieni i dati grezzi dal foglio Excel
      let rawData: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

      // Mappa i campi del CSV ai nomi delle colonne del database
      let mappedData = rawData.map(row => {
        // Salta righe vuote
        if (!row['Tipologia'] && !row['Nome Vino']) return null;

        // Mappa i campi dal CSV ai nomi delle colonne del database
        return {
          wine_name: row['Nome Vino'] || '',
          type: row['Tipologia'] || '',
          region: row['Regione'] || '',
          denomination: row['Denominazione'] || '',
          menu_name: row['Nome per Carta'] || '',
          company: row['Azienda'] || '',
          vine: row['Vitigno'] || '',
          year: row['Anno'] || '',
          reseller: row['Acquistato da '] || '',
          price: row['Prezzo bottiglia'] ? parseFloat(row['Prezzo bottiglia'].toString().replace('€', '').trim()) : '',
          sciolze_vinery: row['Cantina Sciolze'] || '0',
          tastuma_vinery: row['Cantina Tastuma'] || '0',
          service_temp: row['Temperatura di servizio'] || '',
          fridge_temp: row['Temperatura frigo'] || '',
          fridge_type: row['Tipo Frigo'] || ''
        };
      }).filter(item => item !== null);

      // Sostituisci gli apostrofi per evitare problemi SQL
      let data = this.replaceApostrophes(mappedData);

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
