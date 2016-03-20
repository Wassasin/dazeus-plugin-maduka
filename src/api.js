import Zombie from 'zombie';
import assert from 'assert';
import _ from 'lodash';

export default class Api {
  constructor() {
    this.browser = new Zombie();
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

  search(what) {
    console.log('Search: ', what);
    return this.browser.fetch("http://www.ah.nl/service/rest/zoeken?rq="+what)
      .then(function(response) {
        console.log("Status code:", response.status);
        assert(response.status === 200);

        return response.text();
      })
      .then(text => {
        let lanes = JSON.parse(text)._embedded.lanes;
        let searchLane = _.find(lanes, x => x.type === 'SearchLane');

        if(searchLane === undefined)
          return [];

        let items = searchLane._embedded.items;

        return _.chain(items)
          .filter(x => x.type === 'Product')
          .map(x => this.parseProduct(x._embedded.product)).value();
      });
  }

  shoppinglist() {
    console.log('Shopping list');
    return this.browser.fetch("http://www.ah.nl/service/rest/mijnlijst")
      .then(function(response) {
        console.log("Status code:", response.status);
        assert(response.status === 200);

        return response.text();
      })
      .then(text => {
        let lanes = JSON.parse(text)._embedded.lanes;
        let shoppingLane = _.find(lanes, x => x.type === 'ShoppingLane');

        if(shoppingLane === undefined) {
          assert("Shopping list empty or not logged in")
          return [];
        }

        let items = shoppingLane._embedded.items;

        return _.chain(items)
          .filter(x => x.type === 'Product')
          .map(x => this.parseProduct(x._embedded.product)).value();
      });
  }

};
