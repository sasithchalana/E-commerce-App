const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/', auth, (req, res) => {
  try {
    const { shippingAddress } = req.body;
    
    // Get user cart items
    const userCart = db.cart_items.filter(item => item.userId === req.user.id);
    if (userCart.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    // Validate stock and calculate total
    let total = 0;
    const orderItems = [];

    for (const item of userCart) {
      const product = db.products.find(p => p.id === item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product ? product.name : 'unknown item'}` });
      }
      total += product.price * item.quantity;
      orderItems.push({
        id: orderItems.length + 1, // temporary ID
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity
      });
    }

    // Reduce stock
    for (const item of userCart) {
      const product = db.products.find(p => p.id === item.productId);
      product.stock -= item.quantity;
    }

    // Create order
    const order = {
      id: db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1,
      userId: req.user.id,
      total,
      status: 'Processing',
      shippingAddress: JSON.stringify(shippingAddress),
      itemCount: userCart.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
      items: orderItems
    };
    
    // Fix up orderItems IDs just in case
    order.items = order.items.map((item, idx) => ({ ...item, id: idx + 1, orderId: order.id }));
    db.orders.push(order);

    // Clear cart
    db.cart_items = db.cart_items.filter(item => item.userId !== req.user.id);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, (req, res) => {
  try {
    const userOrders = db.orders.filter(o => o.userId === req.user.id).map(o => {
      // Return order summary (without full items list to save bandwidth)
      const { items, ...summary } = o;
      return summary;
    });
    // Sort newest first
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', auth, (req, res) => {
  try {
    const order = db.orders.find(o => o.id === parseInt(req.params.id) && o.userId === req.user.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
