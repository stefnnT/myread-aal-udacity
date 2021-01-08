import React from "react";

const Book = props => {
  const { book } = props;
  const { title, authors, imageLinks, shelf } = book;

  const shelfChange = e => {
    const { book, handleShelfChange } = props;
    handleShelfChange(book, e.target.value);
  };

  if (!book.imageLinks) return null;

  return (
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
            <select value={shelf} onChange={shelfChange}>
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
        <div className="book-authors">{authors ? authors.join(", ") : ""}</div>
      </div>
    </li>
  );
};

export default Book;
