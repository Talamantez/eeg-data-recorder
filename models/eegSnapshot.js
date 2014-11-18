var mongoose = require('mongoose');

var eegSchema = new mongoose.Schema({
  timeStamp: {type: Date, default: Date.now},
  delta: Number,
  theta: Number,
  loAlpha: Number,
  hiAlpha: Number,
  loBeta: Number,
  hiBeta: Number,
  loGamma: Number,
  midGamma: Number
},{
	collection: 'eeg'
});

var eegSnapshot = mongoose.model('eegSnapshot', eegSchema);

module.exports = eegSnapshot;
