import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {},
    genres: [],
    isNew: false,
  };

  //on model init'd
  //Populate movie object and update state accordingly
  //It is here we can determine if this is a new movie or not based on the id parameter

  //How do we get an array of genre names from an object?

  // Populate schema once model is loaded (this way we have the list of Genres valid for the list box)
  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    rate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();

    const { match, history } = this.props;

    if (match.params.id === "new")
      return this.setState({ isNew: true, genres });

    const movie = getMovie(match.params.id);
    if (!movie) {
      console.log("not found");
      history.push("/not-found");
      return;
    }

    //If we make it here, populate our form data from the details in the movie id
    const data = {
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate,
    };

    this.setState({ genres, data });
  }

  doSubmit = () => {
    // Call the server - in this case we will be calling the fakeMovieService
    console.log("Submitted");
  };

  render() {
    const nameTemp = "genre2"; //Extracting this shortly
    const label = "Genre";
    const { genres } = this.state;
    const error = null;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <div className="form-group">
            <label htmlFor={nameTemp}>{label}</label>
            <select className="custom-select" name={nameTemp}>
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
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
