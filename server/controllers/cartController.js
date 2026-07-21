const Cart = require('../models/Cart');



// GET /api/cart
exports.getCart = async(req, res) => {
    let cart = await Cart.findOne({user: req.user._id}).populate('items.product');
    if(!cart) cart = await Cart.create({user : req.user._id, items : [] });
    res.json(cart);
    };



// POST /api/cart  { productId, qty }    
exports.addToCart = async(req, res) => {
    const {product, quantity = 1} = req.body;
    let cart = await Cart.findOne({ user: req.user._id});
    if(!cart) cart = await Cart.create({user: req.user._id, items: []});
    
    const existing = cart.items.find(i => i.product.toString() === productId);
    if(existing){
        existing.quantity += quantity;
    }else{
        cart.items.push({product : productId, quantity});
    }
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
};



// PUT /api/cart/:productId  { qty }
exports.updateCartItem = async(req, res) => {
    const {quantity} = req.body;
    const cart = await Cart.findOne({user: req.user._id});
    if(!cart) return res.status(404).json({message: ' Cart not found'});
    
    const item = cart.items.find(i => i.product.toString() === req.params.productId);
    if(!item) return res.status(404).json({message : 'Item not in cart'});

    if(quantity <= 0){
        cart.items = cart.items.filter(i => i.product.toString() === req.params.productId)
    }else{
        item.quantity = quantity;
    }
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
};



// DELETE /api/cart/:productId
exports.removeFromCart = async(req, res) => {
    const cart = await Cart.findOnd({ user : req.user._id});
    if(!cart) return res.status(404).json({ message : 'Cart not found'});

    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
};



// DELETE /api/cart
exports.clearCart = async(req, res) => {
    const cart = await Cart.findOne({users: req.user._id});
    if(cart){
        cart.items = [];
        await cart.save();
    }
    res.json({message : 'Cart cleared'});
};