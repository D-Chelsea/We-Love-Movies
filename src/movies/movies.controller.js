const asyncErrorBoundary = require("../errors/asyncErrorBoundry")
const service = require("./movies.service")

//returns a list of all the movies that are showing
async function list(req, res, next){
    const { is_showing } = req.query
    if (!(is_showing)){
        return res.json({ data: await service.list() })
    }
    const movieList = await service.currentlyShowing()
    res.json({ data: movieList })
}


//checks to see if the movie exists
async function movieExists(req,res,next){
    const movie = await service.read(req.params.movieId)
    if(movie){
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: `Movie cannot be found.` })
}

//returns a single movie by id
async function read(req, res, next){
    res.json({data: res.locals.movie})
}

//reads a list of theaters showing at the movieId parameter
async function readTheaters(req, res, next) {
    const { movieId } = req.params;
    const theaterList = await service.readTheaters(movieId);
    res.json({ data: theaterList });
}

//reads the reviews that match teh movieId parameter
async function readReviews(req, res) {
    const { movieId } = req.params;
    const reviewList = await service.readReviews(movieId);
    res.json({ data: reviewList });
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(movieExists),asyncErrorBoundary(readReviews)],

}
