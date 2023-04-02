import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from './models/wine';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  private apiUrl = 'http://192.168.1.20:3000/api';

  constructor(private http: HttpClient) { }

  getWines(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/wines`);
  }

  getWinesTypes() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/wines/type`);
  }

  getWineFromType(type: string) : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/wine?type=` + type);
  }

  getWineFromName(name: string) : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/wine?wine_name=` + name);
  }

  saveNewWine(wine: any){
    return this.http.post<any>(`${this.apiUrl}/wine`, wine );
  }

  editWine(wine: any){
    return this.http.put<any>(`${this.apiUrl}/wine`, wine );
  }
  
  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }
}
