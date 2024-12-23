/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  // private client: Client;

  // constructor() {
  //   if (!this.client) {
  //     this.connect();
  //   }
  // }

  // private connect() {
  //   this.client = new Client({
  //     host: 'http://localhost:9200',
  //     log: 'trace'
  //   });
  // }


  // fullTextSearch(_index, _type, _field, _queryText): any {
  //   return this.client.search({
  //     index: _index,
  //     type: _type,
  //     filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
  //     body: {
  //       'query': {
  //         'match_phrase_prefix': {
  //           [_field]: _queryText,
  //         }
  //       }
  //     },
  //     '_source': ['fullname', 'address']
  //   });
  // }
}
