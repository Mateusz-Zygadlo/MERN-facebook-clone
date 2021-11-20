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
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  yourInvitations: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  invitations: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
})

module.exports = mongoose.model('Users', UserSchema);