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
	collection: 'eegTest'     /*

                             'eegNap'   for napping,
                             'eegSleep' for sleeping,
                             'eegAwake' for wake recording,
                             'eegControl' for control data,
                             'eegMock' for mock data.
                              Be sure this matches db in app.js
                              and to switch mongo to this db
                              */
});

var eegSnapshot = mongoose.model('eegSnapshot', eegSchema);

module.exports = eegSnapshot;