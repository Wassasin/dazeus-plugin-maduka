import request from 'request';
import assert from 'assert';
import jsdom from 'jsdom';
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
      price: product.priceLabel.now,
      discount: (product.discount !== undefined)
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

  list(listId, callback) {
    this.browser.get("http://www.ah.nl/service/rest/shoppinglists/"+listId,
        (error, response, body) => {
          assert(!error & response.statusCode === 200);

          callback(
            _.chain(JSON.parse(body).items._embedded.items)
              .filter(x => x.type === 'PRODUCT')
              .map(x => {
                let product = this.parseProduct(x.item);
                product.quantity = x.quantity;
                product.shoppinglistId = x.id;
                return product;
            }).value()
          );
        });
  }

  listLists(callback) {
    this.browser.get("http://www.ah.nl/lijstjes",
        (error, response, body) => {
          assert(!error & response.statusCode === 200);

          jsdom.env(body, ["http://code.jquery.com/jquery.js"], (err, window) => {
            let result = [];
            window.$("a.product").each(function(i, card) {
              let name = card.querySelector("h2").innerHTML.replace(/\u00AD/g, '');
              let id = _.tail(card.getAttribute("href").split(/=/g));

              result.push({
                name: name,
                id: id
              });
            });
            callback(result);
          });
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
