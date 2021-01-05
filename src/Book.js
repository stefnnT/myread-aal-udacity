import React, { Component } from "react";

class Book extends Component {
  shelfChange = e => {
    const { book, handleShelfChange } = this.props;
    handleShelfChange(book, e.target.value);
  };

  render() {
    const { book } = this.props;
    const { title, authors, imageLinks, shelf } = book;
    if (!book.imageLinks) return;

    return (
      // <li>{JSON.stringify(book)}</li>
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks.thumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={this.shelfChange}
                onBlur={this.shelfChange}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors ? authors[0] : ""}</div>
        </div>
      </li>
    );
  }
}

export default Book;
