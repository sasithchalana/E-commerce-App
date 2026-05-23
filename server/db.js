// In-memory Database
const db = {
  users: [],
  products: [
    { id: 1, name: 'Wireless Noise-Cancelling Headphones', description: 'Premium headphones with active noise cancellation.', price: 349.99, image: 'https://picsum.photos/seed/headphones/600/600', category: 'Electronics', stock: 15, rating: 4.8, reviewsCount: 120 },
    { id: 2, name: '4K Ultra HD Smart TV 55"', description: 'Stunning 4K resolution with smart features.', price: 799.99, image: 'https://picsum.photos/seed/tv/600/600', category: 'Electronics', stock: 10, rating: 4.5, reviewsCount: 300 },
    { id: 3, name: 'Mechanical Gaming Keyboard', description: 'Tactile mechanical switches with RGB lighting.', price: 179.99, image: 'https://picsum.photos/seed/keyboard/600/600', category: 'Electronics', stock: 25, rating: 4.7, reviewsCount: 85 },
    { id: 4, name: 'Portable Bluetooth Speaker', description: 'Waterproof speaker with 24-hour battery life.', price: 129.99, image: 'https://picsum.photos/seed/speaker/600/600', category: 'Electronics', stock: 30, rating: 4.6, reviewsCount: 210 },
    { id: 5, name: 'Premium Leather Crossbody Bag', description: 'Handcrafted genuine leather bag.', price: 289.99, image: 'https://picsum.photos/seed/bag/600/600', category: 'Fashion', stock: 8, rating: 4.9, reviewsCount: 45 },
    { id: 6, name: 'Classic Aviator Sunglasses', description: 'Polarized lenses with metal frame.', price: 159.99, image: 'https://picsum.photos/seed/sunglasses/600/600', category: 'Fashion', stock: 40, rating: 4.4, reviewsCount: 150 },
    { id: 7, name: 'Cashmere Blend Overcoat', description: 'Elegant and warm overcoat for winter.', price: 499.99, image: 'https://picsum.photos/seed/coat/600/600', category: 'Fashion', stock: 5, rating: 4.8, reviewsCount: 32 },
    { id: 8, name: 'Minimalist Swiss Watch', description: 'Precision Swiss movement with leather strap.', price: 899.99, image: 'https://picsum.photos/seed/watch/600/600', category: 'Fashion', stock: 12, rating: 4.9, reviewsCount: 75 },
    { id: 9, name: 'Artisan Pour-Over Coffee Maker', description: 'Glass and wood pour-over setup.', price: 89.99, image: 'https://picsum.photos/seed/coffee/600/600', category: 'Home & Living', stock: 50, rating: 4.5, reviewsCount: 90 },
    { id: 10, name: 'Handwoven Moroccan Rug', description: 'Authentic wool rug with geometric patterns.', price: 449.99, image: 'https://picsum.photos/seed/rug/600/600', category: 'Home & Living', stock: 4, rating: 4.7, reviewsCount: 20 },
    { id: 11, name: 'Smart LED Floor Lamp', description: 'App-controlled ambient lighting.', price: 199.99, image: 'https://picsum.photos/seed/lamp/600/600', category: 'Home & Living', stock: 20, rating: 4.3, reviewsCount: 110 },
    { id: 12, name: 'Egyptian Cotton Sheet Set', description: '1000 thread count luxury bedding.', price: 249.99, image: 'https://picsum.photos/seed/sheets/600/600', category: 'Home & Living', stock: 15, rating: 4.6, reviewsCount: 88 },
    { id: 13, name: 'Carbon Fiber Road Bicycle', description: 'Ultralight aerodynamic road bike.', price: 1299.99, image: 'https://picsum.photos/seed/bike/600/600', category: 'Sports & Outdoors', stock: 3, rating: 4.9, reviewsCount: 15 },
    { id: 14, name: 'Ultralight Hiking Backpack', description: 'Durable and lightweight 40L pack.', price: 189.99, image: 'https://picsum.photos/seed/backpack/600/600', category: 'Sports & Outdoors', stock: 25, rating: 4.7, reviewsCount: 65 },
    { id: 15, name: 'Smart Fitness Tracker Pro', description: 'Advanced health metrics and GPS.', price: 249.99, image: 'https://picsum.photos/seed/tracker/600/600', category: 'Sports & Outdoors', stock: 35, rating: 4.5, reviewsCount: 250 },
    { id: 16, name: 'Insulated Camping Hammock', description: '4-season hammock with built-in underquilt.', price: 159.99, image: 'https://picsum.photos/seed/hammock/600/600', category: 'Sports & Outdoors', stock: 18, rating: 4.8, reviewsCount: 42 }
  ],
  cart_items: [],
  orders: []
};

module.exports = db;
