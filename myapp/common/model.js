var mongoose = require('mongoose');

var phoneSchema = mongoose.Schema({
    phoneNumber: { type: String,required: true },
    secretNumber: { type: String,required: true },
    desc: { type: String },
    location: { type: String,required: true}
});

exports.phone = mongoose.model('phone',phoneSchema);