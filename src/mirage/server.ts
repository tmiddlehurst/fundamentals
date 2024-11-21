import { createServer } from 'miragejs';
import { models, factories, handlersMap } from './generated/index';
import type { HandlerRequest, MirageRouteHandler } from './generated/index';
import { JSONAPISerializer } from 'miragejs';

const serverConfig = {
  environment: 'test',
  models,
  factories,

  serializers: {
    application: JSONAPISerializer
  },

  seeds() { },

  routes() {
    handlersMap.forEach(
      (handler: MirageRouteHandler, info: HandlerRequest) => {
        // @ts-expect-error these are known methods
        this[info.verb](info.path, handler);
      }
    );
  }
};

export const makeServer = () => createServer(serverConfig);