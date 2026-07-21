const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');



// POST /api/orders { shippingAddress }
exports.createOrder = async(req, res) => {
    try{
        const {shippingAddress} = req.body;
        const cart = await Cart.findOne({user: req.user._id}).populate('items.product');

        if(!cart || cart.items.length === 0){
            return res.status(400).json({message: 'Cart is empty'});
            }

        const items = cart.items.map( i => ({
                product : i.product._id,
                name : i.product.name,
                quantity : i.quantity,
                price : i.product.price,
            }));

        const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const order = await Order.create({
            user : req.user._id,
            items, 
            shippingAddress,
            totalPrice,
        });

        //decrement stock
        for (const i of cart.item){
            await Product.findByIdAndUpdate(i.product._id, {$inc: {stock : -i.quantity} });
        }

        cart.items = [];
        await cart.save();
        res.status(201).json(order);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};



// GET /api/orders/myorders
exports.getMyOrders = async(req, res) => {
    const orders = await Order.find({ user : req.user._id}).sort({createdAt : -1});
    res.json(orders);
};



// GET /api/orders/:id
exports.getOrderById = async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order) return res.status(404).json({message : ' Order not found'});

    if(order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({message : ' Not Authorised'});
    }
    res.json(order);
};



// GET /api/orders  (admin - all orders)
exports.getAllOrders = async(req, res) => {
    const orders = await Order.find({}).populate('user', 'name email').sort({createdAt : -1});
    res.json(orders);
};



// PUT /api/orders/:id/status  (admin)
exports.updateOrderStatus = async(req, res) =>{
    const {status} = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, {status}, {new : true});
    if(!order) return res.status(404).json({message : ' Order not found'});
    res.json(order);
};