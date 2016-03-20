import * as storage from '../storage';
import {getResult, getResultCount} from '../searches';
import util from 'util';
import numeral from 'numeral';
import named_indices from '../named_index';
import _ from 'lodash';
import {printProduct} from '../util';

export default function add(args, origin, reply) {
  if (args.length === 0) {
    reply("Which product do you want to add from the latest search?");
    return;
  }

  let index = args[0];

  // resolve amount and index to the correct item
  let quantity = 1;
  if (args.length > 2 && args[1] === 'of') {
    index = args[2];
    quantity = args[0];
    if (_.isNumber(named_indices[quantity])) {
      quantity = named_indices[quantity];
    } else {
      quantity = parseInt(args[0], 10);
    }
  }

  // resolve index
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

  let total = getResultCount(origin);
  let result = getResult(origin, index);
  if (result) {
    result.quantity = quantity;
    storage.addToList(result);
    reply(util.format("Added %s to list", printProduct(result)));
  } else if (total > 0) {
    reply(util.format("Could not find a result at position %s, we only have %s things to choose from", index + 1, total));
  } else {
    reply("No results available to choose from");
  }
}
