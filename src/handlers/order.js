import * as storage from '../storage';
import Api from '../api.js';
import config from '../../config.json';
import _ from 'lodash';

export default function order(args, origin, reply) {
  let api = new Api();
  api.login(config.username, config.password, () => {
    api.list(products => {
      if(products.length > 0) {
        reply("Removing " + products.length + " products from prior list...");
      }

      Promise.all(
        _.map(products, x => {
          return new Promise((resolve, reject) => {
            api.deleteItem(x.shoppinglistId, resolve);
          });
        })
      ).then(
        () => {
          let list = storage.getList();
          Promise.all(_.map(list, x => {
            return new Promise((resolve, reject) => {
              api.addQuantity(x.id, x.quantity, resolve);
            });
          })).then(() => {
            reply("Submitted " + list.length + " product(s) to http://www.ah.nl/mijnlijst");
          });
        },
        () => {
          reply("Something went wrong when submitting");
        }
      );
    });
  });
}
