var mongoose = require('mongoose');

var phoneSchema = mongoose.Schema({
    phoneNumber: { type: String,required: true },
    secretNumber: { type: String,required: true },
    desc: { type: String },
});

exports.phone = mongoose.model('phone',phoneSchema);