const Product = require('../models/productModel')

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ id: productId, quantity: 1 });
        }

        await user.save();

        res.status(200).json({ success: true, cart: user.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }

        await user.save();

        res.status(200).json({ success: true, cart: user.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === productId);
        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
            } else {
                existingItem.quantity = quantity;
            }

            await user.save();
            return res.status(200).json({ success: true, cart: user.cartItems });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartitems } })

        const cartItems = products.map((product) => {
            const item = req.user.find((cartItem) => cartItem.id === product.id)
            return { ...product.toJSON(), quantity: item.quantity }
        })

        res.status(200).json({ success: true, cart: cartItems });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
