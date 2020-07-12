const mongoose = require('mongoose');

const partsScema = new mongoose.Schema({
  name: { type: String, required: true }
}, { strict: false })

const widgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parts: { type: Array }
});

module.exports = mongoose.model("widgets", widgetSchema);