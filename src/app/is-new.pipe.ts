/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNew'
})
export class IsNewPipe implements PipeTransform {
  transform(productDate: string): string {
    const currentDate = new Date();
    const productDateObj = new Date(productDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (productDateObj >= oneMonthAgo) {
      return 'New';
    } else {
      return '';
    }
  }
}
