import * as storage from '../storage';
import Api from '../api.js';
import config from '../../config.json';
import _ from 'lodash';

export default function order(args, origin, reply) {
  let api = new Api();
  if(args.length == 0) {
    reply("Please specify which list to import. i.e. }ah import 1");
  }

  let listId = args[0];

  api.login(config.username, config.password, () => {
    api.list(listId, products => {
      _.each(products, storage.addToList);
      reply("Imported " + products.length + " products from list " + listId);
    });
  });
}
