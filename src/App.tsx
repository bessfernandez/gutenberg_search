import * as React from "react";

const CATALOG_URL = `https://cdn.mxpnl.com/static/misc/gutenberg-catalog.txt`;
const STORAGE_KEY = `gutenberg-catalog`;
const MAX_DISPLAY_ITEMS = 50;

function getArticleUrl(id) {
  return `https://www.gutenberg.org/ebooks/${id}`;
}

async function fetchArticles() {
  let catalog = localStorage.getItem(STORAGE_KEY);
  if (!catalog) {
    catalog = await (await fetch(CATALOG_URL)).text();
    localStorage.setItem(STORAGE_KEY, catalog);
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
  resultsCount: number;
  filterTime: number;
  search: string;
}

export default class Counter extends React.Component<Props, State> {
  state: State = {
    articles: [],
    filteredArticles: [],
    resultsCount: 0,
    filterTime: 20,
    search: ""
  };

  async componentDidMount() {
    const articles = await fetchArticles();
    this.setState({ articles }, () => {
      this.setState({
        filteredArticles: this.state.articles.slice(0, MAX_DISPLAY_ITEMS)
      });
    });
  }

  filterResults = searchTerm => {
    // start searching only past 3 chars to optimize performance
    if (searchTerm.length > 3) {
      let filteredArticles = this.state.articles;
      let regexMatch = new RegExp(searchTerm, "gi");

      // reset each filtered article to its original name -
      // in case name has been augment through previous filter operation
      filteredArticles.forEach((item, index) => {
        item.name = item.origName;
      });

      // return only articles where search term appears in name
      filteredArticles = filteredArticles.filter(article => {
        let articleName = article.name.toLowerCase();
        return articleName.indexOf(searchTerm.toLowerCase()) !== -1;
      });

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

      this.setState({
        filteredArticles: filteredArticles,
        resultsCount: filteredArticles.length
      });
    } else {
      if (searchTerm.length === 0) {
        this.state.filteredArticles.forEach((item, index) => {
          item.name = item.origName;
        });
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
    this.filterResults(event.target.value);
  };

  handleElementScroll = (event: React.ChangeEvent<any>) => {
    // only augment state of filtered results when not searching
    if (!this.state.search.length) {
      let element = event.target;
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

  createMarkup(name) {
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
            onChange={this.handleInputUpdate}
            value={this.state.search}
          />
          <div className="results">
            {!!this.state.resultsCount && (
              <span className="result-count">
                Found {this.state.resultsCount} results in{" "}
                {this.state.filterTime}
              </span>
            )}
            <ul className="articles" onScroll={this.handleElementScroll}>
              {filteredArticles.map((item, index) => {
                return [
                  <li key={item.id}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={getArticleUrl(item.id)}
                      key={index}
                      dangerouslySetInnerHTML={this.createMarkup(item.name)}
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
