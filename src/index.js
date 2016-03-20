import * as dazeus from 'dazeus';
import * as dazeus_util from 'dazeus-util';
import _ from 'lodash';

let argv = dazeus_util.yargs().argv;
dazeus_util.help(argv);
var options = dazeus_util.optionsFromArgv(argv);

let client = dazeus.connect(options, () => {
  client.onCommand('ah', (network, user, channel, command, str, ...args) => {
    console.log(args);
    console.log(str);
  });
  console.log("test");
});
