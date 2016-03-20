# dazeus-plugin-maduka
IRC interface for the Albert Heijn inventory and ordering system

## Running
Start the project with `bin/gulp run` or run the plugin directly using
`node index.js` in the root of the project.

To watch for changes and automatically restart the plugin when a change in the
sources occurs use `bin/gulp watch`. To optionally pass command line arguments
use the alternative `bin/watch`.

Before running the command use `cp config.json.default config.json` to create
a personalized configuration.
