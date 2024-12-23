/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductIndex } from 'src/app/data/hero';
@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  private client: Client;
  private queryalldocs = {
    'query': {
      'match_all': {},
     
    }
  };
  constructor(private _http: HttpClient) {
    if (!this.client) {
      this._connect();
    }
  }
  private _connect() {
    this.client = new Client({
      host: environment.elasticSearchUrl,
      log: 'trace'
    });
  }
  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,

    });
  }
  getAllDocumentsWithScroll(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      scroll: '1m',

      body: {
        'query': {
          'match_all': {}
        },

      }
    });
  }

  fullTextSearch(_index, _type, _field, _queryText): any {
    console.log("queryText", _queryText);
    return this.client.search({
      index: _index,
      type: _type,

      q: _queryText,
      size: 10000,
    });
  }
  getProducts() {

    console.log("productimage was selected");
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };

    // return this._http.get<ProductIndex>('http://localhost:9200/getProductDetails', httpOptions).pipe();
     return this._http.get<ProductIndex>('http://localhost:8080/getProductDetails', httpOptions).pipe();
  }
}

