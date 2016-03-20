import * as storage from '../storage';

export default function list(args, origin, reply) {
  reply("Currently listing: " + storage.getList().join(', '));
}
