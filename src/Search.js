import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import seralizeForm from "form-serialize";
import Book from "./Book";

class Search extends Component {
  state = {
    books: [],
    error: null
  };

  handleInputChange = e => {
    if (!e.target.value) {
      this.setState({ books: [] });
    }
  };

  handleSearch = e => {
    e.preventDefault();
    const search = seralizeForm(e.target, { hash: true });

    BooksAPI.search(search.search).then(books => {
      if (books.error) {
        this.setState({ books: [], error: books.error });
      } else {
        BooksAPI.getAll().then(shelvedBooks => {
          books.forEach(book => {
            const shelved = shelvedBooks.find(el => el.id === book.id);
            book.shelf = shelved ? shelved.shelf : "none";
            this.setState(currentState => ({
              books: currentState.books.concat([book])
            }));
          });
        });
        this.setState({ error: null });
      }
    });
  };

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(currentState => ({
        books: currentState.books.map(el => {
          if (el.id === book.id) {
            el.shelf = shelf;
          }
          return el;
        })
      }));
    });
  };

  render() {
    const { books, error } = this.state;
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
            <form onSubmit={this.handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="Search by title or author"
                onChange={this.handleInputChange}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {error && (
            <div style={{ color: "red", textAlign: "center" }}>
              Error: {` ${error}`}
            </div>
          )}
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                book={book}
                handleShelfChange={this.handleShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
