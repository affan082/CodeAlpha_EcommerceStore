const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    items : [{
            product : {type : mongoose.Schema.Types.ObjectId, ref : 'Product', required : true},
            name : String,
            quantity : Number,
            price : Number,
            }],
            shippingAddress : {
                address : {type : String, required : true},
                city : {type : String, required : true},
            }, 
            totalPrice : {type : Number, required : true},
            isPaid : {type : Boolean, default: false},
            status : {type : String, enum : ['pending', 'processing', 'shipped', 'delivered'], default : 'pending',},
}, {timestamps : true});



module.exports = mongoose.model('Order', orderSchema);