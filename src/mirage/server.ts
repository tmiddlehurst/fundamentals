import { createServer, Model, Server } from 'miragejs';
import { handlersMap, factories, models } from './generated/index';
import type { HandlerRequest, MirageRouteHandler } from './generated/index';
import { noteFactory, timeSeriesPointFactory } from './factories';

const serverConfig = {
  models: { ...models, note: Model },
  factories: { ...factories, note: noteFactory, timeSeriesPoint: timeSeriesPointFactory },

  seeds(server: Server) {
    server.createList("note", 60);
    server.createList("timeSeriesPoint", 350);
  },

  routes() {
    handlersMap.forEach(
      (handler: MirageRouteHandler, info: HandlerRequest) => {
        // @ts-expect-error these are known methods
        this[info.verb](info.path, handler);
      }
    );

    this.get('/notes');
    this.get('/market-data/time-series', (schema, request) => {
      return {
        meta: {
          symbol: request.queryParams.symbol,
          interval: '1min',
          currency: 'USD',
          exchange_timezone: 'America/New_York',
          exchange: 'NASDAQ',
          mic_code: 'XNAS',
          type: 'Common Stock'
        },
        values: schema.db.timeSeriesPoints,
        status: 'ok'
      };
    });
  }
};

export const makeServer = () => createServer(serverConfig);