import * as storage from '../storage';
import {printProduct} from '../util';
import util from 'util';
import _ from 'lodash';

const MAX_MESSAGE_LEN = 500;

export default function list(args, origin, reply) {
  let messages = [];

  let l = _.reduce(storage.getList(), (acc, product, idx) => {
    let str = util.format("[%s] %s", idx + 1, printProduct(product));
    if (str.length + acc.length > MAX_MESSAGE_LEN) {
      messages.push(acc);
      acc = "";
    }

    if (acc.length > 0) {
      acc += " || ";
    }
    acc += str;
    return acc;
  }, "");

  if (l.length > 0) {
    messages.push(l);
  }

  reply(util.format(
    "Currently storing %s item(s) in shopping list:",
    storage.getList().length
  ));

  messages.forEach(m => reply(m));
}
