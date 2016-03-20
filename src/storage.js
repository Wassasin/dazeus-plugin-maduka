import store from 'node-persist';
import _ from 'lodash';

const ITEM_LIST = 'items';

function defaultVal(val, def) {
  return _.isNull(val) || _.isUndefined(val) ? def : val;
}

export function addToList(item) {
  let items = defaultVal(store.getItemSync(ITEM_LIST), []);

  items.push(item);
  store.setItemSync(ITEM_LIST, items);
}

export function getList() {
  return defaultVal(store.getItemSync(ITEM_LIST), []);
}

export function clearList() {
  store.setItemSync(ITEM_LIST, []);
}

export function setFlag(name, value) {
  store.setItemSync('flag__' + name, value);
}

export function getFlag(name, def) {
  return defaultVal(store.getItemSync('flag__' + name), def);
}
