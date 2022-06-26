const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'email is required'] },
  age: { type: Number, required: [true, 'age is required'] },
});

module.exports = model('Client', ClientSchema);
