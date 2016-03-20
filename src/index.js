import * as dazeus from "dazeus";
import * as dazeus_util from "dazeus-util";

let argv = dazeus_util.yargs().argv;
dazeus_util.help(argv);
var options = dazeus_util.optionsFromArgv(argv);

let client = dazeus.connect(options, () => {

});
