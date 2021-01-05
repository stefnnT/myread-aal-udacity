import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class Shelf extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState(() => ({
        currentlyReading: books.filter(obj => obj.shelf === "currentlyReading"),
        wantToRead: books.filter(obj => obj.shelf === "wantToRead"),
        read: books.filter(obj => obj.shelf === "read")
      }));

      console.log(this.state.read);
    });
  }

  handleUpdateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.componentDidMount();
    });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {currentlyReading && currentlyReading.length > 0 && (
              <BookShelf
                books={currentlyReading}
                title="Currently Reading"
                updateBookShelf={this.handleUpdateBookShelf}
              />
            )}
            {wantToRead && wantToRead.length > 0 && (
              <BookShelf
                books={wantToRead}
                title="Want to Read"
                updateBookShelf={this.handleUpdateBookShelf}
              />
            )}
            {read && read.length > 0 && (
              <BookShelf
                books={read}
                title="Read"
                updateBookShelf={this.handleUpdateBookShelf}
              />
            )}
          </div>
        </div>
        <Link to="/search" className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </Link>
      </div>
    );
  }
}

export default Shelf;
