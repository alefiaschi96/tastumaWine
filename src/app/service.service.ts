import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../environments/environment';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // Use Supabase URL from environment variable
  private supabaseUrl = environment.supabaseUrl;
  private apiUrl = `${this.supabaseUrl}/rest/v1`;
  private functionsUrl = `${this.supabaseUrl}/functions/v1`;

  // HTTP headers for Supabase
  private headers = new HttpHeaders({
    apikey: environment.supabaseAnonKey,
    Authorization: `Bearer ${environment.supabaseAnonKey}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  private cache = new Map<
    string,
    { timestamp: number; observable: Observable<any> }
  >();

  private cacheDuration = 1000 * 60 * 60 * 24;

  private getCachedRequest(url: string): Observable<any> {
    const now = Date.now();
    const cached = this.cache.get(url);

    if (cached && now - cached.timestamp < this.cacheDuration) {
      return cached.observable;
    }

    const observable = this.http
      .get<any>(url, { headers: this.headers })
      .pipe(shareReplay(1));

    this.cache.set(url, {
      timestamp: now,
      observable,
    });

    return observable;
  }

  getWines(): Observable<any> {
    const url = `${this.apiUrl}/wine`;
    return this.getCachedRequest(url);
  }

  getWinesTypes(): Observable<any> {
    const url = `${this.apiUrl}/wine?select=type&order=type`;
    return this.getCachedRequest(url);
  }

  getWineFromType(type: string): Observable<any> {
    const url = `${this.apiUrl}/wine?type=eq.${encodeURIComponent(type)}`;
    return this.getCachedRequest(url);
  }
  getWineFromName(name: string): Observable<any> {
    const url = `${this.apiUrl}/wine?wine_name=ilike.*${encodeURIComponent(
      name
    )}*`;
    return this.getCachedRequest(url);
  }

  clearCache(): void {
    this.cache.clear();
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
                  this.clearCache();
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

  createUser(mail: string, password: string, role: string) {
    return this.http.post<any>(
      `${this.functionsUrl}/createUser`,
      { email: mail, password: password, role: role },
      { headers: this.headers }
    );
  }
}
