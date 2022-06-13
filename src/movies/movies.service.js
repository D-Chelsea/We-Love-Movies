const knex = require("../db/connection") // need knex for db management
const mapProperties = require("../utils/map-properties")
const table = "movies as m"

function list() {
    return knex(table).select("*")
}

function listCurrentlyShowing() {
    return knex(table)
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id")
}

function readTheaters(movieId) {
    return knex(table)
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"m.movie_id": movieId})
  }

function read(movie_id) {
    return knex(table)
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