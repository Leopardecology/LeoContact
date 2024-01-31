// hashPassword.js
const bcrypt = require('bcrypt');

const password = ''; // replace with the desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Hashed Password:", hash);
    // Output the hash to use it in the next step
});
