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

export default function handle (data, args, origin, reply) {
  let command = args.length > 0 ? args.shift() : '';

  // switch over available commands or display default help
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
      } else {
        reply("Order disabled, use flag to enable");
      }
      break;

    case 'search':
      search(args, origin, reply);
      break;

    case 'import':
      importlist(args, origin, reply);
      break;

    case 'help':
      help(reply);
      break;

    default:
      // list of debug commands
      if (config.debug) {
        switch (command) {
          case 'disable':
            disable(args, origin, reply);
            break;

          case 'enable':
            enable(args, origin, reply);
            break;

          default:
            helpAfterUnknown(reply);
        }
      } else {
        helpAfterUnknown(reply);
      }
  }
}

function help(reply) {
  reply("Use '}ah search (term)' to search for items on the AH website. Add items from the search list to the local list via '}ah add (index)'. Use '}ah list' to display the local list. '}ah remove (index)' removes an item from the local list.");
  reply("'}ah order' replaces the shopping list of the user in config.json with the local list of items. '}ah clear' empties the local list. '}ah import (num) imports the shopping list labeled (num) into the local list.")
}

function helpAfterUnknown(reply) {
  reply("You have entered a wrong/unknown command. Use '}ah help' for a short reference to this plugin.");
}
