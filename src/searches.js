import moment from 'moment';
import _ from 'lodash';

let latest_searches = {};

export function setSearch(origin, results) {
  let [network, channel, user] = origin;
  if (!_.isObjectLike(latest_searches[network])) {
    latest_searches[network] = {};
  }

  if (!_.isObjectLike(latest_searches[network][channel])) {
    latest_searches[network][channel] = {};
  }

  latest_searches[network][channel] = results;
};

export function getResult(origin, item) {
  let [network, channel, user] = origin;
  if (latest_searches[network] && latest_searches[network][channel]) {
    let results = latest_searches[network][channel];
    if (results.length > item) {
      return results[item];
    }
  }

  return null;
}

export function getResultCount(origin) {
  let [network, channel, user] = origin;
  if (latest_searches[network] && latest_searches[network][channel]) {
    return latest_searches[network][channel].length;
  }

  return 0;
}
