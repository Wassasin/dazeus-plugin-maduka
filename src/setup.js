import config from '../config';
import storage from 'node-persist';
storage.initSync();

import numeral from 'numeral';
numeral.language(config.language, require('numeral/languages/' + config.language));
numeral.language(config.language);
