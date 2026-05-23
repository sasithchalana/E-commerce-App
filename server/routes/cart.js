const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  try {
    const userCart = db.cart_items.filter(item => item.userId === req.user.id);
    const items = userCart.map(item => {
      const product = db.products.find(p => p.id === item.productId);
      return {
        id: item.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
        stock: product.stock
      };
    });
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = db.products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cartItem = db.cart_items.find(item => item.userId === req.user.id && item.productId === productId);
    
    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stock) cartItem.quantity = product.stock;
    } else {
      cartItem = {
        id: db.cart_items.length > 0 ? Math.max(...db.cart_items.map(i => i.id)) + 1 : 1,
        userId: req.user.id,
        productId,
        quantity: Math.min(quantity, product.stock)
      };
      db.cart_items.push(cartItem);
    }

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = db.cart_items.find(item => item.id === parseInt(req.params.id) && item.userId === req.user.id);
    if (!cartItem) return res.status(404).json({ message: 'Item not found in cart' });

    const product = db.products.find(p => p.id === cartItem.productId);
    if (quantity > product.stock) return res.status(400).json({ message: 'Not enough stock' });

    cartItem.quantity = quantity;
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const index = db.cart_items.findIndex(item => item.id === parseInt(req.params.id) && item.userId === req.user.id);
    if (index === -1) return res.status(404).json({ message: 'Item not found in cart' });

    db.cart_items.splice(index, 1);
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
