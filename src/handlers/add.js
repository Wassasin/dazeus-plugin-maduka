import * as storage from '../storage';

export default function add(args, reply) {
  storage.addToList(args.join(' '));
}
