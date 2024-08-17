const express = require('express');
const router = express.Router();
const Cart = require('../Models/cart');
const Menu = require('../Models/menu'); // Ensure the Menu model is imported

// Get cart
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to cart
router.post('/add', async (req, res) => {
    const { userId, menuId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const menuExistsIndex = cart.items.findIndex(item => item.menuId.toString() === menuId);
        if (menuExistsIndex !== -1) {
            // If menu item already exists in cart, increment quantity
            cart.items[menuExistsIndex].quantity += quantity;
        } else {
            // Add new item to cart
            const menuItem = await Menu.findById(menuId); // Assuming Menu model exists
            if (!menuItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            const { name, description, price, image } = menuItem;
            cart.items.push({ menuId, name, description, price, image, quantity });
        }

        await cart.save();
        res.json({ message: 'Item added to cart successfully', items: cart.items });
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).send('Server error');
    }
});

// Remove item from cart
router.delete('/delete/:itemId', async (req, res) => {
    const { userId } = req.body;
    const { itemId } = req.params;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        res.json({ message: 'Item removed from cart successfully', items: cart.items });
    } catch (err) {
        console.error('Error removing item from cart:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
