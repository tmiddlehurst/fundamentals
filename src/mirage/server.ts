import { createServer, Factory, Model } from 'miragejs';
import { handlersMap } from './generated/index';
import type { HandlerRequest, MirageRouteHandler } from './generated/index';
import { noteFactory } from './factories';

const serverConfig = {
  models: { note: Model },
  factories: { note: noteFactory },

  seeds(server) {
    server.createList("note", 60);
  },

  routes() {
    handlersMap.forEach(
      (handler: MirageRouteHandler, info: HandlerRequest) => {
        // @ts-expect-error these are known methods
        this[info.verb](info.path, handler);
      }
    );

    this.get('/notes');
  }
};

export const makeServer = () => createServer(serverConfig);