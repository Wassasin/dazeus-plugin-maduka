import request from 'request';
import assert from 'assert';
import _ from 'lodash';

//require('request-debug')(request);

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
              callback();
            });
        });
  }

  search(what, callback) {
    return this.browser.get('https://www.ah.nl/service/rest/zoeken?rq='+what,
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

  list(callback) {
    return this.browser.get("https://www.ah.nl/service/rest/mijnlijst",
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
                product.shoppinglistId = _.last(x._embedded.listItem._links.delete.href.split(/\//g));
                assert(product.shoppinglistId !== undefined);
                return product;
            }).value()
          );
        });
  }

  deleteItem(shoppinglistId, callback) {
    return this.browser.put(
        {
          url: "http://www.ah.nl/service/rest/shoppinglists/0/items/"+shoppinglistId,
          json: true,
          headers: {
            "Content-Type": "application/json-patch+json"
          },
          body: {
            quantity: 0,
            id: shoppinglistId
          }
        },
        (error, response, body) => {
          assert(!error & response.statusCode === 200);
          callback();
        });
  }

  addQuantity(id, quantity, callback) {
    return this.browser.post(
        {
          url: "https://www.ah.nl/service/rest/shoppinglists/0/items",
          json: true,
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            type: "PRODUCT",
            item: {id: id},
            quantity: quantity,
            originCode: "BCL" //???
          }
        },
        (error, response, body) => {
          assert(!error & response.statusCode === 200);
          callback();
        });
  }
};
