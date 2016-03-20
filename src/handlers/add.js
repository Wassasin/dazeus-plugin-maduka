import * as storage from '../storage';

export default function add(args, origin, reply) {
  storage.addToList(args.join(' '));
}
