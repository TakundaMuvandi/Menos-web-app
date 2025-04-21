const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true } // Ensure username is unique
});

// Apply passport-local-mongoose plugin (it automatically handles password)
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);