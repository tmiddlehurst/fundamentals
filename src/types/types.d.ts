import { Note, Problem, Stock, Quote, Price } from "./generated";

export type Note = Note;
export class Stock {
  'name': string;
  'symbol': Symbol;
  'notes': Array<Note>;
}
export type Quote = Quote;
export type Price = Price;
export type Problem = Problem;
export type Ticker = string;

export const symbols = ['AAPL', 'MSFT', 'AMZN'] as const;
export type Symbol = (typeof symbols)[number];