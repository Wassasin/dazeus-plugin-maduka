// }ah list
// }ah add [id]
// }ah remove [id]
// }ah clear
// }ah order
// }ah search [query]

import Api from './api';
import _ from 'lodash';
import * as storage from './storage';
import store from 'node-persist';
import config from '../config';

import add from './handlers/add';
import clear from './handlers/clear';
import list from './handlers/list';
import order from './handlers/order';
import remove from './handlers/remove';
import search from './handlers/search';

export default function handle (data, args, origin, reply) {
  let command = args.length > 0 ? args.shift() : '';
  switch (command) {
    case 'list':
      list(args, origin, reply);
      break;

    case 'add':
      add(args, origin, reply);
      break;

    case 'remove':
      remove(args, origin, reply);
      break;

    case 'clear':
      clear(args, origin, reply);
      break;

    case 'order':
      if (storage.getFlag('order', true)) {
        order(args, origin, reply);
      }
      break;

    case 'search':
      search(args, origin, reply);
      break;

    case 'disable':
      if (config.username === args[1]) {
        storage.setFlag(args[0], false);
        reply("Disabled flag " + args[0]);
      }
      break;

    case 'enable':
      if (config.username === args[1]) {
        storage.setFlag(args[0], enable);
        reply("Enabled flag " + args[0]);
      }

    default:
      reply("Unknown command");
  }
}
