import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import debounce from "./Debounce";
import Spinner from "./Spinner";

class Search extends Component {
  state = {
    books: [],
    query: "",
    loading: false,
    error: null
  };

  handleInputChange = debounce(e => this.handleSearch(), 1000);

  setInputState = e => {
    const query = e.target.value;
    this.setState(() => ({ query }));
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.handleSearch();
  };

  handleSearch = async () => {
    let { query } = this.state;
    query = query.trim();

    // reset books state to default for cases where use pastes
    // search query on an highlighted previous query
    this.setState(() => ({ books: [], loading: true }));

    if (!query) {
      this.setState(() => ({ books: [], loading: false }));
      return;
    }
    try {
      const books = await BooksAPI.search(query);

      if (books.error) {
        this.setState(() => ({
          books: [],
          error: "Error: Invalid query string",
          loading: false
        }));
      } else {
        const shelvedBooks = await BooksAPI.getAll();
        books.forEach(book => {
          const shelved = shelvedBooks.find(el => el.id === book.id);
          book.shelf = shelved ? shelved.shelf : "none";
          this.setState(currentState => ({
            books: currentState.books.concat([book])
          }));
        });
        this.setState(() => ({ error: null, loading: false }));
      }
    } catch (error) {
      this.setState(() => ({
        error: "Error connecting to API",
        loading: false
      }));
    }
  };

  handleShelfChange = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);

      this.setState(currentState => ({
        books: currentState.books.map(el => {
          if (el.id === book.id) {
            el.shelf = shelf;
          }
          return el;
        })
      }));
    } catch (error) {
      this.setState(() => ({
        error: "Error connecting to API",
        loading: false
      }));
    }
  };

  render() {
    const { books, error, loading } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <form onSubmit={this.handleFormSubmit}>
              <input
                type="text"
                name="search"
                placeholder="Search by title or author"
                onInput={e => {
                  this.setInputState(e);
                  this.handleInputChange(e);
                }}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <ol className="books-grid">
              {books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  handleShelfChange={this.handleShelfChange}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
