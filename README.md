# dazeus-plugin-maduka
IRC interface for the Albert Heijn inventory and ordering system

## Running
Start the project with `bin/gulp run` or run the plugin directly using
`node index.js` in the root of the project.

To watch for changes and automatically restart the plugin when a change in the
sources occurs use `bin/gulp watch`. To optionally pass command line arguments
use the alternative `bin/watch`.

Before running the command use `cp config.json.default config.json` to create
a personalized configuration. It is required to enter a valid username/password to place an order.

## Commands
The basic strategy is to search for items with `}ah search`, add items through `}ah add` with indices of the search list, and finally `}ah order` to commit the items to the shopping list on the AH website. The plugin then provides a link to finalize the ordering process.
Items with `!!!` in their description are currently discounted.

### Search
syntax: `}ah search [search term]`  
Search the AH website for any items that match [search term]. This is not a regular expression.

### Add
syntax: `}ah add [index]`  
This command adds the item with index [index] on the search list to the local list.

### Remove
syntax: `}ah remove [index]`  
Removes item with index [index] from the local list.

### Import
syntax: `}ah import [id]`  
Imports the shopping list labeled [id] into the local list.

### List
syntax: `}ah list`  
Display the current list of items to be committed to the shopping list.

### Order
syntax: `}ah order`  
Commit the items in the local list to the shopping list on the AH website using the credentials in `config.json` and provides a link to finalize the ordering process.

### Clear
syntax: `}ah clear`  
Empties the local list of items.
