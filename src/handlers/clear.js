import * as storage from '../storage';
import util from 'util';

export default function clear(args, origin, reply) {
  let itemcount = storage.getList().length;
  storage.clearList();
  if (itemcount === 0) {
    reply("Nothing to remove");
  } else {
    reply(util.format("Had %s items in the shopping cart, but they're gone now", itemcount));
  }
}
