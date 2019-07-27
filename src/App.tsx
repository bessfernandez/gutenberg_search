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
      return { name, id };
    });
}

interface Props {}

interface State {
  articles: Array<{ id: string; name: string }>;
  filteredArticles: Array<{ id: string; name: string }>;
  search: string;
}

export default class Counter extends React.Component<Props, State> {
  state: State = {
    articles: [],
    filteredArticles: [],
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
    let filteredArticles = this.state.filteredArticles;

    filteredArticles = filteredArticles.filter(article => {
      let articleName = article.name.toLowerCase();
      return articleName.indexOf(searchTerm.toLowerCase()) !== -1;
    });

    this.setState({
      filteredArticles: filteredArticles
    });
  };

  handleInputUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
    this.filterResults(event.target.value);
  };

  handleElementScroll = (event: React.ChangeEvent<any>) => {
    let element = event.target;
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      this.setState({
        filteredArticles: this.state.articles.slice(
          0,
          this.state.filteredArticles.length + MAX_DISPLAY_ITEMS
        )
      });
    }
  };

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
            <ul className="articles" onScroll={this.handleElementScroll}>
              {filteredArticles.map((item, index) => {
                return [
                  <li key={item.id}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={getArticleUrl(item.id)}
                    >
                      {item.name}
                    </a>
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
