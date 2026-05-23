const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(db.products.map(p => p.category))];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', (req, res) => {
  try {
    let results = [...db.products];
    const { category, search, sort } = req.query;

    if (category) {
      results = results.filter(p => p.category === category);
    }
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (sort) {
      if (sort === 'price_asc') results.sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
      else if (sort === 'newest') results.sort((a, b) => b.id - a.id);
      else if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
