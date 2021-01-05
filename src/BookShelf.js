import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  handleShelfChange = (book, shelf) => {
    this.props.updateBookShelf(book, shelf)
  };

  render() {
    const { books, title } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
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

export default BookShelf;
