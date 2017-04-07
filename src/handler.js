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
import importlist from './handlers/import';
import {disable, enable} from './handlers/flag';

export default function handle (data, args, origin, reply, done) {
  let command = args.length > 0 ? args.shift() : '';

  // switch over available commands or display default help
  switch (command) {
    case 'list':
      list(args, origin, reply, done);
      break;

    case 'add':
      add(args, origin, reply, done);
      break;

    case 'remove':
      remove(args, origin, reply, done);
      break;

    case 'clear':
      clear(args, origin, reply, done);
      break;

    case 'order':
      if (storage.getFlag('order', true)) {
        order(args, origin, reply, done);
      } else {
        reply("Order disabled, use flag to enable");
      }
      break;

    case 'search':
      search(args, origin, reply, done);
      break;

    case 'import':
      importlist(args, origin, reply, done);
      break;

    case 'help':
      help(reply, done);
      break;

    default:
      // list of debug commands
      if (config.debug) {
        switch (command) {
          case 'disable':
            disable(args, origin, reply, done);
            break;

          case 'enable':
            enable(args, origin, reply, done);
            break;

          default:
            helpAfterUnknown(reply, done);
        }
      } else {
        helpAfterUnknown(reply, done);
      }
  }
}

function help(reply, done) {
  reply("Use `_cmd_ search (term)` to search for items on the AH website. Add items from the search list to the local list via `_cmd_ add (index)`. Use `_cmd_ list` to display the local list. `_cmd_ remove (index)` removes an item from the local list.");
  reply("`_cmd_ order` replaces the shopping list of the user in config.json with the local list of items and provides an order link. `_cmd_ clear` empties the local list. `_cmd_ import (num)` imports the shopping list labeled (num) into the local list.")
  done();
}

function helpAfterUnknown(reply, done) {
  reply("You have entered a wrong/unknown command. Use `_cmd_ help` for a short reference to this plugin.");
  done();
}
