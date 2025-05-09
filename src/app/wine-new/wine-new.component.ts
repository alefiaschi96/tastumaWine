import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private router: Router
  ) {}

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

  // Gestisce l'evento dragover per prevenire il comportamento predefinito del browser
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Aggiungiamo una classe per lo stile durante il drag
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
      dropArea.classList.add('drag-over');
    }
  }

  // Gestisce l'evento dragleave per rimuovere lo stile quando il file esce dall'area
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Rimuoviamo la classe di stile
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
      dropArea.classList.remove('drag-over');
    }
  }

  // Gestisce l'evento drop quando il file viene rilasciato
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Rimuoviamo la classe di stile
    const dropArea = document.getElementById('drop-area');
    if (dropArea) {
      dropArea.classList.remove('drag-over');
    }

    // Otteniamo i file trascinati
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Prendiamo solo il primo file
      const file = files[0];

      // Verifichiamo che sia un file supportato
      if (/\.(xlsx|xls|csv)$/i.test(file.name)) {
        this.processFile(file);
      } else {
        this.error = 'Formato file non supportato. Utilizza .xls, .xlsx o .csv';
      }
    }
  }

  // Metodo per attivare l'input file nascosto
  triggerFileInput(): void {
    // Preveniamo la propagazione dell'evento per evitare click multipli
    event?.stopPropagation();

    // Troviamo l'input file e simuliamo un click su di esso
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Gestisce la selezione del file tramite input
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  // Funzione comune per elaborare il file selezionato o trascinato
  private processFile(file: File): void {
    const reader: FileReader = new FileReader();

    // Determina se il file è un Excel binario (.xls, .xlsx) o un CSV
    const isExcel = /\.(xlsx|xls)$/i.test(file.name);

    reader.onload = (e: any) => {
      try {
        let wb: XLSX.WorkBook;

        if (isExcel) {
          // Per i file Excel, usa direttamente l'ArrayBuffer
          const arrayBuffer = e.target.result;
          wb = XLSX.read(arrayBuffer, { type: 'array' });
        } else {
          // Per i file CSV, usa il rilevamento dell'encoding
          const arrayBuffer = e.target.result;
          const bytes = new Uint8Array(arrayBuffer);
          const detectedEncoding = Encoding.detect(bytes) || 'UTF8';

          const text = Encoding.convert(bytes, {
            from: detectedEncoding as Encoding.Encoding,
            to: 'UNICODE',
            type: 'string',
          });

          wb = XLSX.read(text, { type: 'string' });
        }

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // Ottieni i dati grezzi dal foglio Excel
        let rawData: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

        // Mappa i campi del CSV ai nomi delle colonne del database
        let mappedData = rawData
          .map((row) => {
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
              price: row['Prezzo bottiglia']
                ? parseFloat(
                    row['Prezzo bottiglia'].toString().replace('€', '').trim()
                  )
                : '',
              sciolze_vinery: row['Cantina Sciolze'] || '0',
              tastuma_vinery: row['Cantina Tastuma'] || '0',
              service_temp: row['Temperatura di servizio'] || '',
              fridge_temp: row['Temperatura frigo'] || '',
              fridge_type: row['Tipo Frigo'] || '',
            };
          })
          .filter((item) => item !== null);

        // Sostituisci gli apostrofi per evitare problemi SQL
        let data = this.replaceApostrophes(mappedData);

        this.service.uploadCsv(data).subscribe({
          next: (res) => {
            console.log('✅ Upload completato con successo');
            this.router.navigate(['/wine-list']);

            this.error = '';
          },
          error: (err) => {
            console.error('❌ Errore upload', err);
            this.error = "Errore durante l'upload";
          },
        });
      } catch (error: unknown) {
        console.error('❌ Errore nella lettura del file:', error);
        // Gestisci error come unknown e verifica se è un'istanza di Error
        if (error instanceof Error) {
          this.error = `Errore nella lettura del file: ${error.message}`;
        } else {
          this.error = 'Errore nella lettura del file: Formato non supportato';
        }
      }
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
