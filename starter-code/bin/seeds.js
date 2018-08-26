const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

mongoose.Promise = Promise;
mongoose
  .connect(
    "mongodb://localhost/mongoose-movies-daily-exercise",
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
    catchphrase: "You cant knock on opportunitys door and not be ready"
  },
  {
    name: "Shakira",
    occupation: "Musician",
    catchphrase: "hips dont lie"
  },
  {
    name: "Britney Spears",
    occupation: "Musician",
    catchphrase: "I know you"
  }
];

Celebrity.deleteMany().then(x => {
  Celebrity.create(celebrities)
    .then(celeb => {
      console.log(
        celeb.length,
        "celebrities were created"
      );
    })
    .catch(err => console.log("could not be created"));
});