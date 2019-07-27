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
    })
    .slice(0, 200); // TODO: remove this when ready
}

interface Props {}

interface State {
  articles: Array<{ id: string; name: string }>;
  search: string;
}

export default class Counter extends React.Component<Props, State> {
  state: State = {
    articles: [],
    search: ""
  };

  async componentDidMount() {
    const articles = await fetchArticles();
    this.setState({ articles });
  }

  filterResults = searchTerm => {
    let filteredArticles = this.state.articles;
    filteredArticles = filteredArticles.filter(article => {
      let articleName = article.name.toLowerCase();
      return articleName.indexOf(searchTerm.toLowerCase()) !== -1;
    });
    this.setState({
      articles: filteredArticles
    });
  };

  handleInputUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
    this.filterResults(event.target.value);
  };

  render(): React.ReactElement {
    const { articles } = this.state;
    var maxArticles = articles.slice(0, MAX_DISPLAY_ITEMS);

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
            <ul className="articles">
              {maxArticles.map((item, index) => {
                return [
                  <li>
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
