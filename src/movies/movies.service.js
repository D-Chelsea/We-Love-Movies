const knex = require("../db/connection") // need knex for db management
const mapProperties = require("../utils/map-properties")

function list() {
    return knex("movies").select("*")
}

function listCurrentlyShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id")
}

function readTheaters(movieId) {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"m.movie_id": movieId})
  }

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ movie_id })
        .first()
}



module.exports = {
    list,
    listCurrentlyShowing,
    read,
    readTheaters,

}