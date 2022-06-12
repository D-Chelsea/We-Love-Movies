const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

//will dynamically calculate the array index of an array property by replacing any `null` value with the next index
const reduceMoves = reduceProperties("theater_id", {
    m_movie_id: ["movies", null, "movie_id"],
    m_title: ["movies", null, "title"],
    m_runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    m_rating: ["movies", null, "rating"],
    m_description: ["movies", null, "description"],
    m_image_url: ["movies", null, "image_url"],
    m_created_at: ["movies", null, "created_at"],
    m_updated_at: ["movies", null, "updated_at"],
    mt_is_showing: ["movies", null, "is_showing"],
    mt_theater_id: ["movies", null, "theater_id"],
})

//lists all the theaters
function list() {
   
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ "mt.is_showing": true })
        .select("*")
        .then(reduceMoves)
}

module.exports = {
    list,
}