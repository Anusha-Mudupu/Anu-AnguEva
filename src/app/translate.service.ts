/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';
  constructor(private http: HttpClient) { }
  translateText(text: string, targetLanguage: string, apiKey: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&target=${targetLanguage}&key=${apiKey}`;
    return this.http.post<any>(url, {});
  }
}
