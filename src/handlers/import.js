import * as storage from '../storage';
import Api from '../api.js';
import config from '../../config.json';
import _ from 'lodash';

export default function importlist(args, origin, reply, done) {
  let api = new Api();
  if(args.length == 0) {
    reply("Please specify which list to import. i.e. _cmd_ import lijstnaam (use 'current' for shopping basket)");
    done();
    return;
  }
  let list = { name: args.join(" ") };

  api.login(config.username, config.password, () => {
    const import_f = list => {
      api.list(list.id, products => {
        _.each(products, storage.addToList);
        reply("Imported " + products.length + " products from list " + list.name + " [id: "+ list.id + "]");
        done();
      });
    };

    if(list.name === "current")
    {
      list.id = 0;
      import_f(list);
    }
    else
    {
      api.listLists(lists => {
        let candidate = _.find(lists, x => x.name === list.name);

        if(candidate === undefined) {
          reply("List " + list.name + " not found");
          done();
          return;
        }

        import_f(candidate);
      });
    }
  });
}
