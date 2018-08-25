const mongoose = require('mongoose');
const celebrity = require('../models/celebrity');


let celebToCreate = celebrity.map(cel => {
    return {
        name : req.body.name,
        occupation: req.body.occupation,
        catchPhrase : req.body.catchPhrase
    }
  });
  
  return User.create(usersToCreate)


.then(usersFromDb => {
  console.log(usersFromDb.length + " users were created");
  console.log("The id of the first user is", usersFromDb[0]._id);
})