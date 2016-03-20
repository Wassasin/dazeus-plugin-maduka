import request from 'request';
import assert from 'assert';
import _ from 'lodash';
import numeral from 'numeral';
import util from 'util';

export default class Api {
  constructor() {
    this.browser = request.defaults({jar: true});;
  }

  parseProduct(product) {
    return {
      id: product.id,
      name: product.description.replace(/\u00AD/g, ''), //Remove soft hyphen
      unit: product.unitSize,
      available: product.availability.orderable,
      price: product.priceLabel.now
    };
  }

  printProduct(product) {
    return util.format('%s  (%s; € %s, %s) ', product.name, product.unit, numeral(product.price).format('0,00'), result.id);
  }

  login(username, password, callback) {
    this.browser.post(
        {
          url: 'https://www.ah.nl/mijn/inloggen/basis',
          form: {
            userName: username,
            password: password
          }
        },
        (error, response, body) => {
          assert(!error & response.statusCode === 200);
          assert(body.search("ingelogdSso") !== -1);

          this.browser.get('https://www.ah.nl/mijn/ingelogdSso',
            (error, response, body) => {
              assert(!error & response.statusCode === 200);
              console.log("Logged in for " + username);
              callback();
            });
        });
  }

  search(what, callback) {
    console.log('Search:', what);
    return this.browser.get('http://www.ah.nl/service/rest/zoeken?rq='+what,
        (error, response, body) => {
          assert(!error & response.statusCode === 200);

          let lanes = JSON.parse(body)._embedded.lanes;
          let searchLane = _.find(lanes, x => x.type === 'SearchLane');

          if(searchLane === undefined)
          {
            callback([]);
            return;
          }

          let items = searchLane._embedded.items;

          callback(
            _.chain(items)
              .filter(x => x.type === 'Product')
              .map(x => this.parseProduct(x._embedded.product)).value()
          );
        });
  }

  shoppinglist(callback) {
    console.log('Shopping list');
    return this.browser.get("http://www.ah.nl/service/rest/mijnlijst",
        (error, response, body) => {
          assert(!error & response.statusCode === 200);

          let lanes = JSON.parse(body)._embedded.lanes;
          let shoppingLane = _.find(lanes, x => x.type === 'ShoppingListLane');

          if(shoppingLane === undefined) {
            callback([]);
            return;
          }

          callback(
            _.chain(shoppingLane._embedded.items)
              .filter(x => x.type === 'Product')
              .map(x => {
                let product = this.parseProduct(x._embedded.product);
                product.quantity = x._embedded.listItem.quantity;
                return product;
            }).value()
          );
        });
  }
};
