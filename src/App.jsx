import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import React, { Component } from "react";
import NavBar from "./components/common/navbar";
import NotFound from "./components/common/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";

class App extends Component {
  render() {
    console.log("Hello");

    return (
      <div>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
