import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class Shelf extends Component {
  state = {
    shelves: [
      { id: "currentlyReading", title: "Currently Reading", books: [] },
      { id: "wantToRead", title: "Want to Read", books: [] },
      { id: "read", title: "Read", books: [] }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // create state object holder
      const shelves = this.state.shelves.map(shelf => ({
        ...shelf,
        books: books.filter(obj => obj.shelf === shelf.id)
      }));

      this.setState(currentState => ({
        ...currentState,
        shelves
      }));
    });
  }

  handleUpdateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.componentDidMount();
    });
  };

  render() {
    const { shelves } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <BookShelf
                key={shelf.id}
                shelf={shelf}
                updateBookShelf={this.handleUpdateBookShelf}
              />
            ))}
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
