if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())


// error imports
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

// router imports
const moviesRouter = require("./movies/movies.router")


// routes
app.use("/movies", moviesRouter)



// errors
app.use(notFound)
app.use(errorHandler)

module.exports = app;