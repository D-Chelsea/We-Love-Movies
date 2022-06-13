const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundry");

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: "Review cannot be found." });
}

async function read(req, res, next){
  res.json({data: res.locals.review})
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.status(204).send("204 No Content")
}


module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  read: [asyncErrorBoundary(reviewExists), read],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}