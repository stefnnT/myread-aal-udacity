import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import Spinner from "./Spinner";

class Shelf extends Component {
  state = {
    shelves: [
      { id: "currentlyReading", title: "Currently Reading", books: [] },
      { id: "wantToRead", title: "Want to Read", books: [] },
      { id: "read", title: "Read", books: [] }
    ],
    error: null,
    loading: false
  };

  async componentDidMount() {
    this.setState(() => ({
      loading: true
    }));

    try {
      const books = await BooksAPI.getAll();

      const shelves = this.state.shelves.map(shelf => ({
        ...shelf,
        books: books.filter(obj => obj.shelf === shelf.id)
      }));

      this.setState(currentState => ({
        ...currentState,
        shelves,
        error: null,
        loading: false
      }));
    } catch (error) {
      this.setState(() => ({
        error: "Error connecting to API",
        loading: false
      }));
    }
  }

  handleUpdateBookShelf = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      this.componentDidMount();
    } catch (error) {
      this.setState(() => ({
        error: "Error connecting to API"
      }));
    }
  };

  render() {
    const { shelves, error, loading } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {loading ? (
              <Spinner />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              shelves.map(shelf => (
                <BookShelf
                  key={shelf.id}
                  shelf={shelf}
                  updateBookShelf={this.handleUpdateBookShelf}
                />
              ))
            )}
          </div>
        </div>
        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export default Shelf;
