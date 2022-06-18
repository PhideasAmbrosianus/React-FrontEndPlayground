import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import Filter from "./common/filter";
import Search from "./common/search";
import { getMovies, deleteMovie } from "../services/movieService";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchFilter: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ genres, movies });
  }

  debug() {
    console.log(this.state.movies);
  }

  renderMoviesList() {
    return;
  }

  //And a better way is to use filter with an arrow function - simpler code
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchFilter: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchChange = (query) => {
    this.setState({
      currentPage: 1,
      selectedGenre: null,
      searchFilter: query,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchFilter,
      movies: allMovies,
    } = this.state;

    // Filter by genre OR by Search box
    let filtered = allMovies;
    if (searchFilter !== "") {
      const p = new RegExp(searchFilter, "i");
      filtered = allMovies.filter((m) => p.test(m.title));
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchFilter } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>No Movies in Database!</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <Filter
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <Search value={searchFilter} onChange={this.handleSearchChange} />
          <span>Showing {totalCount} movies in the database.</span>
          <MoviesTable
            user={user}
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLikeClick={this.handleLikeClick}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
