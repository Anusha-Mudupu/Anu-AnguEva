/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
  
  get nativeWindow(): any {
    return this._window();
  }
  _window(): any {
    // return the native window obj
    return window;
  }
}