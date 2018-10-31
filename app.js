const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')

let moviesList = []

app.use(express.static('css'))

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache',mustacheExpress())

app.set('views','./movies')

app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  res.render('add-movies', {moviesList : moviesList})
})

// app.get('/movies', function(req, res) {
//   res.render('movies', {moviesList : moviesList})
// })

app.get('/add-movies', function(req, res) {
  res.render('add-movies', {moviesList : moviesList})
})

app.post('/add-movies', function(req, res) {

  let title = req.body.movieTitle
  let description = req.body.movieDescription
  let genre = req.body.movieGenre
  let poster = req.body.moviePosterURL

  moviesList.push({ movieTitle: title, movieDescription: description, movieGenre: genre, moviePoster: poster})

  res.redirect('/add-movies')

})

app.post('/delete-movies', function(req, res) {

  let title = req.body.movieTitle
  console.log(title);

  moviesList = moviesList.filter(function(movie) {
    return movie.movieTitle != title
  })
  //res.redirect('/add-movies')
  res.render('movies-deleted', {title : title})
})


app.listen(port, function() {
  console.log("Another Day of Coding")
})
