const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

//will dynamically calculate the array index of an array property by replacing any `null` value with the next index
const reduceMoves = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  });

//lists all the theaters
function list() {
   return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then(reduceMoves)
}

module.exports = {
    list,
}