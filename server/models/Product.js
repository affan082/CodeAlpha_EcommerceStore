const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String, required: true, maxlength: 350},
    price:{type: Number, required: true},
    category:{ type: String,required: true},
    stock:{type: Number, required: true, default: 0},
    images:[{type: String}],
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);

