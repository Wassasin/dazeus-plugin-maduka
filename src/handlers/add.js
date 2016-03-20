import * as storage from '../storage';
import {getResult, getResultCount} from '../searches';
import util from 'util';
import numeral from 'numeral';
import named_indices from '../named_index';
import _ from 'lodash';

export default function add(args, origin, reply) {
  if (args.length === 0) {
    reply("Which product do you want to add from the latest search?");
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

  let total = getResultCount(origin);

  // support negative indexes


  let result = getResult(origin, index);
  if (result) {
    storage.addToList(result);
    reply(util.format("Added %s (%s; € %s) to list", result.name, result.unit, numeral(result.price).format('0,00')))
  } else if (total > 0) {
    reply(util.format("Could not find a result at position %s, we only have %s things to choose from", index + 1, total));
  } else {
    reply("No results available to choose from");
  }
}
