import { Factory } from "miragejs";

const examples = [
  ['AAPL', 'Apple'],
  ['MSFT', 'Microsoft'],
  ['TSLA', 'Tesla'],
  ['NVDA', 'Nvidia'],
  ['COST', 'CostCo'],
  ['BABA', 'Alibaba'],
  ['NFLX', 'Netflix'],
];

const noteFactory = Factory.extend({
  id(i) {
    return `${i}`;
  },
  name(i) {
    return examples[i % (examples.length)][1];
  },
  symbol(i) {
    return examples[i % (examples.length)][0];
  },
  title(i) {
    const r = Math.random() * 365 * (1000 * 3600 * 24);
    const now = Date.now();
    const date = new Date(now - r);
    const company = examples[i % (examples.length - 1)];
    return `Analysis of ${company} on ${date.toDateString()}`;
  },
  date() {
    const r = Math.random() * 365 * (1000 * 3600 * 24);
    const now = Date.now();
    const date = new Date(now - r);
    return date.toISOString();
  },
  price: 210,
  note: 'string',
  priceTarget: 190,
  followUpDate: '2024-10-27T07:46:19.663Z',
  confidence() {
    return Math.ceil(Math.random() * 10);
  },
});

export { noteFactory };