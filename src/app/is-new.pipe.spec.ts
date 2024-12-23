/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { IsNewPipe } from './is-new.pipe';

describe('IsNewPipe', () => {
  it('create an instance', () => {
    const pipe = new IsNewPipe();
    expect(pipe).toBeTruthy();
  });
});
