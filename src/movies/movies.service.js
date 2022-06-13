const knex = require("../db/connection") // need knex for db management
const mapProperties = require("../utils/map-properties")

const criticInfo = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
  });
  
function readReviews(movieId) {
    return knex("movies as m")
    .join("reviews as r" , "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({"m.movie_id": movieId})
    .select("*")
    .then((reviews) => reviews.map(criticInfo))
  }

function list() {
    return knex("movies").select("*")
}

function currentlyShowing() {
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

function read(movieId) {
    return knex("movies as m")
        .select("*")
        .where({ "m.movie_id" : movieId })
        .first()
}



module.exports = {
    list,
    currentlyShowing,
    read,
    readTheaters,
    readReviews
}