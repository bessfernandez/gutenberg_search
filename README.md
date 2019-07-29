

# Gutenberg catalog search

A demo of pulling in the books from the Gutenberg project and implementing search as you type. Check it out on my [Github.io page](https://bessfernandez.github.io/gutenberg_search/). 

## Features
- Show the names of the articles as links. Clicking an article opens in a new tab. Shows a 50 limit article count by default.
- As you scroll through articles more articles load for the user to browse.
- You can do a simple search and see available articles from that search
- Matched segments of the search will be highlighted in available article results
- Will show article count and time load took to show
- *Bonus feature* Normal keyboard navigation works for input and list items and you can also move through articles and search by using up and down arrows. Hitting enter on an article will open it as expected.


## TODO
- The keyboard navigation is rough. It is very tightly coupled to the HTML structure to search for the next / previous items to navigate to. Currently React doesn't allow an array of refs, so couldn't arbitrarily update ref indexes to focus on. The better bet would likely integrate a third party library to handle hot keys or similar.
- Tests need to be added for basic state and render changes such as ensuring that correct length of articles show, matched segments are built correctly, etc.
  

## Tech stack
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses React, react-dom, TypeScript, ES6, as well as a number of other libraries.


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



### `npm run build`

Builds the app for production to the `demo` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**


