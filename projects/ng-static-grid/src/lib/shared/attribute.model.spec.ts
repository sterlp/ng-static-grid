import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Attribute, NOP_PARSER, NUMBER_PARSER, STRING_PARSER, INT_PARSER } from './attribute.model';

describe('Attribute', () => {
  it('should create an instance', () => {
    expect(new Attribute<number>(NOP_PARSER)).toBeTruthy();
    expect(new Attribute<number>(NOP_PARSER, 1).value).toBe(1);
  });

  it('test NUMBER_PARSER', () => {
    expect(NUMBER_PARSER(undefined)).toBe(null);
    expect(NUMBER_PARSER(null)).toBe(null);
    expect(NUMBER_PARSER(1)).toBe(1);
    expect(NUMBER_PARSER('1')).toBe(1);
    expect(NUMBER_PARSER('-11')).toBe(-11);
    expect(NUMBER_PARSER('1aa')).toBe(null);
  });

  it('test INT_PARSER', () => {
    expect(INT_PARSER(undefined)).toBe(null);
    expect(INT_PARSER(null)).toBe(null);

    expect(INT_PARSER('asasd')).toBe(null);

    expect(INT_PARSER(1)).toBe(1);
    expect(INT_PARSER(1.2)).toBe(1);
    expect(INT_PARSER('1.1')).toBe(1);
    expect(INT_PARSER('1.51')).toBe(2);
  });

  it('test STRING_PARSER', () => {
    expect(STRING_PARSER(undefined)).toBe(null);
    expect(STRING_PARSER(null)).toBe(null);

    expect(STRING_PARSER(1)).toBe('1');
    const d = new Date();
    expect(STRING_PARSER(d)).toBe(d.toString());
  });
});
