import React from "react";
import { Route, Switch } from "react-router-dom";
// import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import Search from "./Search";
import NotFound404 from "./NotFound404";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Shelf} />
          <Route exact path="/search" component={Search} />
          <Route path="*" component={NotFound404} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
