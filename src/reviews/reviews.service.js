const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//Creates a function to map the properties of an object to different properties on a new object.
const mapCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//using knex to read what is in the review table
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//using knex to update the review table with the updateReview info
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .first()
        .then(mapCritic);
    });
}
//destroy a review from the table by the reviewId
function destroy(reviewId) {
  return knex("reviews")
  .where({ review_id: reviewId })
  .del();
}

module.exports = {
  update,
  delete: destroy,
  read,
};