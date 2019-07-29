import * as React from "react";

const CATALOG_URL = `https://cdn.mxpnl.com/static/misc/gutenberg-catalog.txt`;
const STORAGE_KEY = `gutenberg-catalog`;
const MAX_DISPLAY_ITEMS = 50;

function getArticleUrl(id: string) {
  return `https://www.gutenberg.org/ebooks/${id}`;
}

async function fetchArticles(): Promise<any> {
  let catalog = localStorage.getItem(STORAGE_KEY);
  if (!catalog) {
    try {
      catalog = await (await fetch(CATALOG_URL)).text();
      localStorage.setItem(STORAGE_KEY, catalog);
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        throw new Error("Sorry local storage limit is exceeded");
      } else {
        throw new Error("Unable to load articles");
      }
    }
  }

  return catalog
    .trim()
    .split(`\n`)
    .reverse()
    .map(line => {
      // parse article's name and id into object
      const [_, name, id] = line.match(/^(.*?)\s+(\d+)$/);
      return { name, origName: name, id };
    });
}

interface Props {}

interface State {
  articles: Array<{ id: string; name: string; origName: string }>;
  filteredArticles: Array<{ id: string; origName: string; name: string }>;
  filterTime: number;
  resultsCount: number;
  search: string;
}

export default class GutenbergSearch extends React.Component<Props, State> {
  state: State = {
    articles: [],
    filteredArticles: [],
    filterTime: 0,
    resultsCount: 0,
    search: ""
  };

  resultsTimerId: any = null;
  filterStartTime: Date = new Date(null || 0);
  searchInput = React.createRef();

  async componentDidMount() {
    const articles = await fetchArticles();
    this.setState({ articles }, () => {
      // after articles are finished being set in state update filtered articles
      // for display at their max display count
      this.setState({
        filteredArticles: this.state.articles.slice(0, MAX_DISPLAY_ITEMS)
      });
    });
  }

  filterStartTimer = (start: Date) => {
    if (!this.resultsTimerId) {
      this.filterStartTime = start;
    }
  };

  stopTimer = () => {
    let stopTime: Date = new Date();
    let timeDifferenceInMillis: number =
      stopTime.getMilliseconds() - this.filterStartTime.getMilliseconds();

    this.setState({
      filterTime: timeDifferenceInMillis
    });
  };

  searchArticles = (searchTerm: string) => {
    // start searching only past 3 chars to optimize performance
    if (searchTerm.length > 3) {
      let filteredArticles = this.state.articles;

      // reset each filtered article to its original name -
      // in case name has been augment through previous filter operation
      this.resetArticleNames();

      // return only articles where search term appears in name
      return (filteredArticles = filteredArticles.filter(article => {
        let articleName = article.name.toLowerCase();
        return articleName.indexOf(searchTerm.toLowerCase()) !== -1;
      }));
    }
  };

  addSearchMatchMarkup = (searchTerm: string, filteredArticles) => {
    let regexMatch = new RegExp(searchTerm, "gi");

    // wrap matched search term with markup
    filteredArticles.forEach((item, index) => {
      let nameMatch = item.name.match(regexMatch);

      // match name making sure to use explicit match so casing is preserved
      if (nameMatch) {
        item.name = item.name.replace(
          nameMatch[0],
          `<span class="highlight">${nameMatch[0]}</span>`
        );
      }
    });

    return filteredArticles;
  };

  resetArticleNames = () => {
    this.state.filteredArticles.forEach((item, index) => {
      item.name = item.origName;
    });
  };

  filterResults = searchTerm => {
    let start = new Date();
    this.filterStartTimer(start);

    // start searching only past 3 chars to optimize performance
    if (searchTerm.length > 3) {
      // filter articles based on search term
      let filteredArticles = this.searchArticles(searchTerm);

      if (filteredArticles) {
        // wrap matched search term with markup
        let filteredArticlesWithMarkup = this.addSearchMatchMarkup(
          searchTerm,
          filteredArticles
        );

        if (filteredArticlesWithMarkup) {
          // set state with updated filtered articles and result count
          // after state is done being set stop the timer and set back to null
          this.setState(
            {
              filteredArticles: filteredArticlesWithMarkup,
              resultsCount: filteredArticles.length
            },
            () => {
              this.stopTimer();
              this.resultsTimerId = null;
            }
          );
        }
      }
    } else {
      this.resetArticleNames();

      // reset articles on empty search
      if (searchTerm.length === 0) {
        this.stopTimer();
        this.resultsTimerId = null;
      }

      // reset filtered article state back to its max display
      this.setState({
        filteredArticles: this.state.articles.slice(0, MAX_DISPLAY_ITEMS),
        resultsCount: 0
      });
    }
  };

  handleInputUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
    // filter articles based on search term
    this.filterResults(event.target.value);
  };

  handleElementScroll = (event: React.ChangeEvent<any>) => {
    // only augment state of filtered results when not searching
    if (!this.state.search.length) {
      let element = event.target;

      // every time user reaches the bottom of scroll overflow add another chunk
      // of MAX_DISPLAY_ITEMS
      if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
        this.setState({
          filteredArticles: this.state.articles.slice(
            0,
            this.state.filteredArticles.length + MAX_DISPLAY_ITEMS
          )
        });
      }
    }
  };

  handleKeyDown = (event, index = 0) => {
    // handle down arrow
    if (event.keyCode === 40) {
      event.preventDefault();

      // when on input focus on next child element which is <li>
      if (event.target.nodeName === "INPUT") {
        // @ts-ignore
        this.searchInput.current.children[0].focus();
      } else if (event.target.nodeName === "A") {
        // when already within anchor navigate up to parent and find next li + anchor
        // based on index
        // @ts-ignore
        this.searchInput.current.parentElement.children[
          index + 1
        ].children[0].focus();
      }
    } else if (event.keyCode === 38) {
      event.preventDefault();

      if (event.target.nodeName === "A") {
        if (index === 0) {
          // when on first anchor walk back up the tree to the input element
          // @ts-ignore
          this.searchInput.current.parentElement.parentElement.previousSibling.focus();
        } else {
          // when already within anchor navigate up to parent and previous next li + anchor
          // based on index
          // @ts-ignore
          this.searchInput.current.parentElement.children[
            index - 1
          ].children[0].focus();
        }
      }
    }
  };

  createMarkup(name) {
    // allow React markup to render provided HTML
    // Note: this is not suggested and could have serious
    // security implications
    // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
    return { __html: name };
  }

  render(): React.ReactElement {
    const { filteredArticles } = this.state;

    return (
      <main className="layout-search">
        <div className="layout-search-inner">
          <input
            className="search"
            type="text"
            placeholder="Search Gutenberg Catalog"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleInputUpdate}
            value={this.state.search}
          />
          <div className="results">
            {!!this.state.resultsCount && (
              <span className="result-count">
                Found {this.state.resultsCount} results in{" "}
                {Math.sign(this.state.filterTime) === 1
                  ? this.state.filterTime
                  : 0}
                ms
              </span>
            )}
            <ul className="articles" onScroll={this.handleElementScroll}>
              {filteredArticles.map((item, index) => {
                return [
                  <li
                    key={item.id}
                    //@ts-ignore
                    ref={index === 0 ? this.searchInput : null}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      // @ts-ignore
                      tabIndex="0"
                      data-index={index}
                      href={getArticleUrl(item.id)}
                      key={index}
                      dangerouslySetInnerHTML={this.createMarkup(item.name)}
                      onKeyDown={event => this.handleKeyDown(event, index)}
                    />
                  </li>
                ];
              })}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
