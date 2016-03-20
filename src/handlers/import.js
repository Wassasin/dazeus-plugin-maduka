import * as storage from '../storage';
import Api from '../api.js';
import config from '../../config.json';
import _ from 'lodash';

export default function importlist(args, origin, reply) {
  let api = new Api();
  if(args.length == 0) {
    reply("Please specify which list to import. i.e. }ah import 1");
  }
  let listName = args[0];

  api.login(config.username, config.password, () => {
    api.listLists(list => {
      let candidate = _.find(list, x => x.name === listName);

      if(candidate === undefined) {
        reply("List " + listName + " not found");
        return;
      }

      api.list(candidate.id, products => {
        _.each(products, storage.addToList);
        reply("Imported " + products.length + " products from list " + listName + " [id: "+ candidate.id + "]");
      });
    });
  });
}
