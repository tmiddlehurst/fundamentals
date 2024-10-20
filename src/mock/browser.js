import { setupWorker } from 'msw/browser';
import { handlers } from './generated/handlers';
import { HttpResponse, http } from 'msw';

async function msftResponse() {
  debugger;
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    name: 'Microsoft',
    symbol: 'MSFT',
    notes: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      date: faker.date.past(),
      id: faker.lorem.words(),
      price: faker.number.int(),
      notes: faker.lorem.words(),
      priceTarget: faker.number.int(),
      followUpDate: faker.date.past(),
      confidence: faker.number.int(),
    })),
  }));
}
const newGet = http.get(`${baseURL}/stocks`, async () => {
  const resultArray = [[await msftResponse(), { status: 200 }]];

  return HttpResponse.json(...resultArray[next() % resultArray.length]);
});

updatedHandlers = [newGet, ...handlers];
debugger;
export const worker = setupWorker(...updatedHandlers);
