var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({

    location: String,
    fullName: String,
    address : String,
    city: String,
    state: String,
    pinCode: {type: Number, required:true},
    phone: Number,
    // Reference Field 
    userId : {required:true, type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    packageName: String,
    price: String,
    isDeleted : Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('address', addressSchema);