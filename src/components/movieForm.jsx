import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
    id: null,
  };

  //on model init'd
  //Populate movie object and update state accordingly
  //It is here we can determine if this is a new movie or not based on the id parameter

  //How do we get an array of genre names from an object?

  // Populate schema once model is loaded (this way we have the list of Genres valid for the list box)
  schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();

    const { history } = this.props;
    const { id } = this.props.match.params;

    if (id === "new") return this.setState({ isNew: true, genres });

    const movie = getMovie(id);
    if (!movie) {
      console.log("not found");
      history.push("/not-found");
      return;
    }

    //If we make it here, populate our form data from the details in the movie id
    const data = {
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };

    this.setState({ genres, data, id });
  }

  doSubmit = () => {
    // Call the server - in this case we will be calling the fakeMovieService
    // Note that in the API both are just handled with SaveMovie - but in real world we'd be calling different API hooks for each
    // Two scenarios - we are either updating or we are creating
    const { isNew, id, data: movie } = this.state;
    const { history } = this.props;

    console.log("Saving movie...", movie);

    if (isNew) {
      //Call create
      saveMovie(movie);
      history.push("/movies");
      return;
    }

    //Call update
    movie._id = id;
    saveMovie(movie);
    history.push("/movies");
    return;
  };

  render() {
    const nameTemp = "genreId"; //Extracting this shortly
    const label = "Genre";
    const { genres, data } = this.state;
    const error = null;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <div className="form-group">
            <label htmlFor={nameTemp}>{label}</label>
            <select
              onChange={this.handleChange}
              className="custom-select"
              name={nameTemp}
              value={data.genreId}
            >
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>MovieID: {match.params.id} </h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

export default MovieForm;
