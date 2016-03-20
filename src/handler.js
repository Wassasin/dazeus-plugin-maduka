// }ah list
// }ah add [id]
// }ah remove [id]
// }ah clear
// }ah order
// }ah search [query]

import Api from './api';

export default function handle (data, args, reply) {
  let command = args.length > 0 ? args.shift() : '';
  switch (command) {
    case 'list':
      break;

    case 'add':
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
      api.search(what).then((products) => {
        console.log(products);
      });
      break;

    default:
      reply("Unknown command");
  }
}
