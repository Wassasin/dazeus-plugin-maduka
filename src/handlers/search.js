import * as storage from '../storage';
import Api from '../api';
import _ from 'lodash';

export default function search(args, reply) {
  let api = new Api();
  let what = args.join(' ');
  api.search(what).then(products => {
    products = _.filter(products, x => x.available);

    if(products.length > 10) {
      reply("Showing 10 of " + products.length + " products...");
    } else {
      reply("Showing " + products.length + " products...");
    }

    _.chain(products)
      .slice(0, 10)
      .map(x => x.id + " " + x.price + " " + x.name + " (" + x.unit + ")")
      .each(x => reply(x)).value();
  });
}
