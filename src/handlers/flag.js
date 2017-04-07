import config from '../../config';
import * as storage from '../storage';

export function disable(args, origin, reply, done) {
  if (config.username === args[1]) {
    storage.setFlag(args[0], false);
    reply("Disabled flag " + args[0]);
  }
  done();
}

export function enable(args, origin, reply, done) {
  if (config.username === args[1]) {
    storage.setFlag(args[0], enable);
    reply("Enabled flag " + args[0]);
  }
  done();
}
