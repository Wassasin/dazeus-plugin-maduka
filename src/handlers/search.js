import * as storage from '../storage';
import Api from '../api';
import _ from 'lodash';
import {setSearch} from '../searches';
import {printProduct} from '../util';
import util from 'util';

export default function search(args, origin, reply, done) {
  let api = new Api();
  let what = args.join(' ');
  api.search(what, products => {
    products = _.filter(products, x => x.available);

    if(products.length > 10) {
      reply("Showing 10 of " + products.length + " products...");
    } else {
      reply("Showing " + products.length + " product(s)...");
    }

    setSearch(origin, products);

    let i = 0;

    _.chain(products)
      .slice(0, 10)
      .map((x, idx) => util.format("[%s] %s", idx + 1, printProduct(x)))
      .each(x => reply(x))
      .value();
    done();
  });
}
