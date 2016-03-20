import storage from 'node-persist';
import _ from 'lodash';

const ITEM_LIST = 'items';

function defaultVal(val, def) {
  return _.isNull(val) || _.isUndefined(val) ? def : val;
}

export function addToList(item) {
  let items = defaultVal(storage.getItemSync(ITEM_LIST), []);

  items.push(item);
  storage.setItemSync(ITEM_LIST, items);
}

export function getList() {
  return defaultVal(storage.getItemSync(ITEM_LIST), []);
}
