const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

mongoose.Promise = Promise;
mongoose
  .connect(
    "mongodb://localhost/lab-mongoose-movies",
    { useMongoClient: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let celebrities = [
  {
    name: "Bruno Mars",
    occupation: "Musician",
    catchPhrase: "You cant knock on opportunitys door and not be ready"
  },
  {
    name: "Shakira",
    occupation: "Musician",
    catchPhrase: "hips dont lie"
  },
  {
    name: "Britney Spears",
    occupation: "Musician",
    catchPhrase: "I know you"
  }
];

Celebrity.deleteMany().then(x=> {
  Celebrity.create(celebrities)
    .then(celeb => {
      console.log(celeb,celeb.length, "celebrities were created");
    })
    .catch(err => console.log("celebrities could not be created"));
});

let movies = [
  {
    title: "Mission Impossible",
    genre: "Action",
    plot:
      "When an IMF mission ends badly, the world is faced with dire consequences."
  },
  {
    title: "Hello Brother",
    genre: "Comedy",
    plot:
      "Brothers fights for their family when they are caught in trouble." 
  },

  {
    title: "Star Wars",
    genre: "fictional",
    plot:
      "Series based on the fictional superhero team of the same name, who originally appeared in a series of comic books."
  }
];

Movie.deleteMany().then(x=> {
  Movie.create(movies)
    .then(movieData => {
      console.log(movieData, movieData.length, "movies were created");
      mongoose.connection.close();
    })
    .catch(err => console.log("Sorry, could not create"));
});