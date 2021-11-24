const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  firstName: {
    type: 'string',
    required: true,
  },
  lastName: {
    type: 'string',
    required: true,
  },
  date: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
})

module.exports = mongoose.model('Posts', PostSchema);