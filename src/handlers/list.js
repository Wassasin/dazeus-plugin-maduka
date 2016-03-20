import storage from '../storage';

export default function list(args, reply) {
  reply("Currently listing: " + storage.getList().join(', '));
}
