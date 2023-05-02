const express = require("express");

require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { validateMovie, validateUser } = require("./validators.js");

//-----------GET--------
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
//-----------POST--------
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, movieHandlers.postUsers);

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", movieHandlers.postUsers);

//-----------PUT--------
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, movieHandlers.updateUsers);

app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", movieHandlers.updateUsers);
//-----------DELETE--------
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
