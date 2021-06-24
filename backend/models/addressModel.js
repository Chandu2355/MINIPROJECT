var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    pinCode: Number,
    address : String,
    locality : String,
    landMark : String,
    City: String,
    State: String,
    // Reference Field 
    userId : { type: Schema.Types.ObjectId, ref: 'user'},
    isDefaultAddress: Boolean,
    isDeleted : Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('address', addressSchema);