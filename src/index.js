import config from '../config';
import storage from 'node-persist';
storage.initSync();

import numeral from 'numeral';
numeral.language(config.language, require('numeral/languages/' + config.language));
numeral.language(config.language);

import * as dazeus from 'dazeus';
import * as dazeus_util from 'dazeus-util';
import _ from 'lodash';
import handle from './handler';


let argv = dazeus_util.yargs().argv;
dazeus_util.help(argv);
var options = dazeus_util.optionsFromArgv(argv);

let client = dazeus.connect(options, () => {
  client.onCommand('ah', (network, user, channel, command, str, ...args) => {
    let responder = (message, highlight=false) => {
      client.reply(network, channel, user, config.prefix + message, highlight);
    };
    handle(str, args, [network, channel, user], responder);
  });
});
