const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/celebrity")
const Movie = require("../models/movie")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//get celebrities page
router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then(celebrities => {
      res.render('celebrities', { celebrities: celebrities });
    })
    .catch(err => {
      console.log('error');
    });
});

module.exports = router;

//get the celebrity details page

router.get("/celebrities/:id", (req, res, next) => {
  let id = req.params.id;
  Celebrity.findById(id)
    .then(foundCeleb => {
      console.log("Hello", foundCeleb);
      res.render("celebritiesdetails", foundCeleb);
    })
    .catch(err => {
      console.log("err");
    });
});

//add new celebrity

router.get('/celebrity-add', (req, res, next) => {
  res.render( 'celebrity-add' );
});

router.post('/celebrity-add', (req, res, next) => {
  let { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase }, (err, celebrity) => {
    if (err) {
      console.log('An error happened:', err);
    } else {
      console.log('The new celebrity has been saved and he/she is: ', celebrity);
      res.redirect('/celebrities');
    } 
  })  
});

// delete celebrity

router.get('/celebrities/:celebrityId/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove( req.params.celebrityId )
    .then( () => {
      console.log("Celebrity deleted!!!");
      res.redirect('/celebrities');
    })
    .catch( err => { throw err } );
});

//edit celebrity

router.get('/celebrities/:celebrityId/edit', (req, res, next) => {
  Celebrity.findById( req.params.celebrityId )
    .then( celebrity => {
      console.log('Editing : ', celebrity );
      res.render( 'celebrity-edit', celebrity );
    })
    .catch( err => { throw err } );
});

//update details and re-direct to /celebrities

router.post('/celebrities/:celebrityId/update', (req, res, next) => {
  let { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate( req.params.celebrityId, { name, occupation, catchPhrase } )
    .then( celebrity => {
      console.log("Editing: ", celebrity );
      res.redirect( `/celebrities/${celebrity._id}`);
    })
    .catch( err => { throw err } );
});

//get movies page

router.get('/movies', (req, res, next) => {
  Movie.find({})
    .then(movies => {
      res.render('movies', { movies: movies });
    })
    .catch(err => {
      console.log('error');
    });
});

//Movie details page

router.get("/movies/:id", (req, res, next) => {
  let id = req.params.id;
  Movie.findById(id)
    .then(foundMovie => {
      console.log("Hello", foundMovie);
      res.render("moviedetails", foundMovie);
    })
    .catch(err => {
      console.log("err");
    });
});

router.get('/celebrity-add', (req, res, next) => {
  res.render( 'celebrity-add' );
});

//add movie 

router.get('/movie-add', (req, res, next) => {
  res.render( 'movie-add' );
});

router.post('/movie-add', (req, res, next) => {
  let { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot }, (err, movie) => {
    if (err) {
      console.log('An error happened:', err);
    } else {
      console.log('The new movie has been saved ', movie);
      res.redirect('/movies');
    } 
  })  
});

//edit movie

router.get('/celebrities/movieId/edit', (req, res, next) => {
Movie.findById( req.params.movieId )
    .then( celebrity => {
      console.log('Editing : ', movie );
      res.render( 'movie-edit', movie );
    })
    .catch( err => { throw err } );
});