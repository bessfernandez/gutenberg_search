

# Gutenberg catalog search

A demo of pulling in open domain articles and ebooks from the [Gutenberg Project](http://gutenberg.org/) and implementing search as you type. Check it out on my [Github.io page](https://bessfernandez.github.io/gutenberg_search/). 

## Features
- Shows the names of the articles or books as links. Clicking an article opens in a new tab. Shows a 50 limit article count by default.
- As you scroll through articles more articles load to browse
- You can do a simple search and see available articles from that search
- Matched segments of the search will be highlighted in available article results
- Will show article count and time it took results to show
- *Bonus feature* - Normal keyboard navigation (ie tabbing) works as expected for input and list items - but in addition can also move through articles and search by using up and down arrows


## TODO
- The amount of articles from Gutenberg when added to local storage currently exceed local storage limit on many browsers (Safari, and mobile browsers), Chrome works as expected. Code currently throws an error if this limit is exceeded. This obviously should be fixed by either storing data in DB looking for a public API to use.
- The keyboard navigation is rough. It is very tightly coupled to the HTML structure to search for the next / previous items to navigate to. Currently React doesn't allow an array of refs, so couldn't arbitrarily update ref indexes to focus on. The better bet would likely integrate a third party library to handle hot keys or similar.
- Time it took to search timer could be improved - it looks like there may be some inconsistencies with timing, needs more investigation
- Tests need to be added for basic state and render changes such as ensuring that correct length of articles show, matched segments are built correctly, etc.
- Overall the TypeScript could be improved
- The product structure isn't great - there should be components, tests, containers directory, etc.
  

## Tech stack
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses React, react-dom, TypeScript, ES6, as well as a number of other libraries.

## NPM commands

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `demo` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm run deploy`

Builds and deploys production ready code. Currently setup to deploy to `gh-pages`.


