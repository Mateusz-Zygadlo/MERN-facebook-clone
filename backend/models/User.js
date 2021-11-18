const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: 'string',
    required: false,
  },
  password: {
    type: 'string',
    required: true,
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
  loginWithFacebook: {
    type: 'boolean',
    required: true,
  },
  facebookId: {
    type: 'number',
    required: false,
  },
  friends: {
    type: 'array',
    required: true,
  },
  yourInvitations: {
    type: 'array',
    required: true,
  },
  invitations: {
    type: 'array',
    required: true,
  },
})

module.exports = mongoose.model('Users', UserSchema);