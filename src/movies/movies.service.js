const knex = require("../db/connection") // need knex for db management
const mapProperties = require("../utils/map-properties")


//Creates a function to map the properties of an object to different properties on a new object.
const criticInfo = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
  });
  
//reads the reviews for a movie at the movieId parameter
function readReviews(movieId) {
    return knex("movies as m")
    .join("reviews as r" , "r.movie_id", "m.movie_id")//joins reviews and movies based on common primaryId
    .join("critics as c", "c.critic_id", "r.critic_id")//joins critic table based on common reviewId
    .where({"m.movie_id": movieId})//where teh movie id matches the movieId parameter
    .select("*")//select all
    .then((reviews) => reviews.map(criticInfo))//then map the reviews with the critics info properties
  }

//return a list of movies from the table using knex
function list() {
    return knex("movies").select("*")
}

//shows a list of currently showing movies from the movies table using knex
function currentlyShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")//joinging movies and theates by a shared primary ID
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id")
}

//shows a list of theaters that are showing a movie at movieID as the parameter
function readTheaters(movieId) {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")//joining movies and theaters by a shared primary ID
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"m.movie_id": movieId})
  }

//reads info of movie from the movies table with the movieId parameter
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