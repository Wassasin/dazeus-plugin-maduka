// }ah list
// }ah add [id]
// }ah remove [id]
// }ah clear
// }ah order
// }ah search [query]

export default function handle (data, args, reply) {
  let command = args.length > 0 ? args[0] : '';
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
      break;

    default:
      reply("Unknown command");
  }
}
