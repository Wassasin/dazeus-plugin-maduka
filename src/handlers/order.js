import * as storage from '../storage';
import Api from '../api.js';
import config from '../../config.json';
import _ from 'lodash';

export default function order(args, origin, reply) {
  let api = new Api();
  api.login(config.username, config.password, () => {
      console.log("test!");
    api.shoppinglist(products => {
      reply("Amount: " + products.length);
      _.each(products, x => reply(x.id));
    });
  });
}
