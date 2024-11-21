import { Factory } from "miragejs";

const examples = [
  ['MSFT', 'Microsoft'],
  ['AAPL', 'Apple'],
  ['TSLA', 'Tesla'],
  ['NVDA', 'Nvidia'],
];

const noteFactory = Factory.extend({
  id(i) {
    return `${i}`;
  },
  name: 'Apple',
  symbol: 'AAPL',
  title: 'Analysis of Apple on 12/12/24',
  date: '2022-10-01T22:43:41.566Z',
  price: 908901583159296,
  note: 'string',
  priceTarget: 635834900414464,
  followUpDate: '2028-10-27T07:46:19.663Z',
  confidence: Math.ceil(Math.random() * 10),
  afterCreate(note) {
    let n = Math.floor(Math.random() * examples.length);
    note.symbol = examples[n][0];
    note.name = examples[n][1];
  }
});

export { noteFactory };