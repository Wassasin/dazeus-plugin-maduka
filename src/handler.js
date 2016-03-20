// }ah list
// }ah add [id]
// }ah remove [id]
// }ah clear
// }ah order
// }ah search [query]

import Api from './api';
import _ from 'lodash';
import * as storage from './storage';


export default function handle (data, args, reply) {
  let command = args.length > 0 ? args.shift() : '';
  switch (command) {
    case 'list':
      reply("Currently listing: " + storage.getList().join(', '));
      break;

    case 'add':
      storage.addToList(args.join(' '));
      break;

    case 'remove':
      break;

    case 'clear':
      break;

    case 'order':
      break;

    case 'search':
      let api = new Api();
      let what = args.join(' ');
      api.search(what).then(products => {
        products = _.filter(products, x => x.available);

        if(products.length > 10) {
          reply("Showing 10 of " + products.length + " products...");
        } else {
          reply("Showing " + products.length + " products...");
        }

        _.chain(products)
          .slice(0, 10)
          .map(x => x.id + " " + x.price + " " + x.name + " (" + x.unit + ")")
          .each(x => reply(x)).value();
      });
      break;

    default:
      reply("Unknown command");
  }
}
