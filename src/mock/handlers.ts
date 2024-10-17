/**
 * This file is AUTO GENERATED by [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)
 * Feel free to commit/edit it as you need.
 */
/* eslint-disable */
/* tslint:disable */
import { http, HttpResponse } from 'msw';
import { faker } from "@faker-js/faker";

faker.seed(1);

const baseURL = "";
const MAX_ARRAY_LENGTH = 20;

let i = 0;
const next = () => {
  if (i === Number.MAX_SAFE_INTEGER - 1) {
    i = 0;
  }
  return i++;
};

export const handlers = [
  http.get(`${baseURL}/stocks`, async () => {
    const resultArray = [
      [await getGetWatchedStocks200Response(), { status: 200 }],
      [await getGetWatchedStocks400Response(), { status: 400 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.post(`${baseURL}/stocks`, async () => {
    const resultArray = [
      [undefined, { status: 200 }],
      [await getAddStock400Response(), { status: 400 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.delete(`${baseURL}/stocks`, async () => {
    const resultArray = [
      [undefined, { status: 200 }],
      [await getRemoveStock400Response(), { status: 400 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/stocks/:symbol`, async () => {
    const resultArray = [
      [undefined, { status: 200 }],
      [await getAddNote400Response(), { status: 400 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.delete(`${baseURL}/stocks/:symbol/:noteId`, async () => {
    const resultArray = [
      [undefined, { status: 200 }],
      [await getDeleteNote400Response(), { status: 400 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
];

export function getGetWatchedStocks200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    name: "Apple",
    symbol: "AAPL",
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

export function getGetWatchedStocks400Response() {
  return null;
}

export function getAddStock400Response() {
  return null;
}

export function getRemoveStock400Response() {
  return null;
}

export function getAddNote400Response() {
  return null;
}

export function getDeleteNote400Response() {
  return null;
}