import * as storage from '../storage';
import named_indices from '../named_index';
import {printProduct} from '../util';
import util from 'util';
import _ from 'lodash';

export default function remove(args, origin, reply) {
  if (args.length === 0) {
    reply("Please indicate which item on the list you want to remove");
    return;
  }

  let index = args[0];
  if (_.isNumber(named_indices[index])) {
    index = named_indices[index];
  } else {
    index = parseInt(index, 10);
    if (index > 0) {
      index -= 1;
    } else if (index < 0) {
      index = total + index;
    }
  }

  let removed = storage.removeFromList(index);
  if (removed) {
    reply(util.format("Removed %s from the list", printProduct(removed)));
  } else {
    reply("This product was not found on the list");
  }
}
