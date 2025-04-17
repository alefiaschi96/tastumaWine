import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // Use Supabase URL from environment variable
  private supabaseUrl = environment.supabaseUrl;
  private apiUrl = `${this.supabaseUrl}/rest/v1`;

  // HTTP headers for Supabase
  private headers = new HttpHeaders({
    apikey: environment.supabaseAnonKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getWines(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/wine`, { headers: this.headers });
  }

  getWinesTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/wine?select=type&order=type`, {
      headers: this.headers,
    });
  }

  getWineFromType(type: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/wine?type=eq.${encodeURIComponent(type)}`,
      { headers: this.headers }
    );
  }

  getWineFromName(name: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/wine?wine_name=ilike.*${encodeURIComponent(name)}*`,
      { headers: this.headers }
    );
  }

  saveNewWine(wine: any) {
    return this.http.post<any>(`${this.apiUrl}/wine`, wine, {
      headers: this.headers,
    });
  }

  editWine(wine: any) {
    return this.http.put<any>(`${this.apiUrl}/wine`, wine, {
      headers: this.headers,
    });
  }

  uploadCsv(data: any[]): Observable<any> {
    return new Observable((observer) => {
      this.http
        .delete(this.apiUrl + '/wine?id=gt.0', { headers: this.headers })
        .subscribe({
          next: () => {
            this.http
              .post(this.apiUrl + '/wine', data, { headers: this.headers })
              .subscribe({
                next: (res) => {
                  observer.next(res);
                  observer.complete();
                },
                error: (err) => observer.error(err),
              });
          },
          error: (err) => observer.error(err),
        });
    });
  }
}
