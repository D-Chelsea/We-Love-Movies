if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())


// errors
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

// routers
const moviesRouter = require("./movies/movies.router")
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")


// routes
app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter)
app.use("/reviews", reviewsRouter)



// errors
app.use(notFound)
app.use(errorHandler)

module.exports = app;