const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: 'string',
    required: false,
    minLength: 1,
    maxLength: 40,
  },
  password: {
    type: 'string',
    required: false,
    minLength: 1,
    maxLength: 80,
  },
  gender: {
    type: 'string',
    required: false,
  },
  picture: {
    type: 'string',
    required: false,
  },
  firstName: {
    type: 'string',
    required: true
  },
  lastName: {
    type: 'string',
    required: true,
  },
  pronoun: {
    type: 'string',
    required: false,
  },
  date: {
    type: 'string',
    required: false,
  },
  loginWithFacebook: {
    type: 'boolean',
    required: true,
  },
  facebookId: {
    type: 'number',
    required: false,
  }
})

module.exports = mongoose.model('Users', UserSchema);