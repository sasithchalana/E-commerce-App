import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Minus, Shield, Truck } from 'lucide-react';
import { api } from '../api';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(id);
        setProduct(data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    setAdding(true);
    await addToCart(product.id, quantity);
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="grid-cols-2">
          <div className="shimmer glass-card" style={{ height: '500px' }}></div>
          <div className="shimmer glass-card" style={{ height: '400px' }}></div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-ghost" 
        style={{ marginBottom: '2rem', padding: 0 }}
      >
        <ArrowLeft size={20} /> Back to Shop
      </button>

      <div className="grid-cols-2" style={{ gap: '4rem', alignItems: 'start' }}>
        {/* Image Gallery (Simplified) */}
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '100%', maxHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ color: 'var(--gold-main)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 600 }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} size={18} 
                    fill={i < Math.floor(product.rating) ? 'var(--gold-main)' : 'transparent'} 
                    color={i < Math.floor(product.rating) ? 'var(--gold-main)' : 'var(--text-secondary)'} 
                  />
                ))}
              </div>
              <span style={{ color: 'var(--text-secondary)' }}>({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <div style={{ fontSize: '2.5rem', color: 'var(--gold-main)', fontWeight: 600 }}>
            ${product.price.toFixed(2)}
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
            {product.description || 'Experience the pinnacle of craftsmanship with this premium selection. Designed to elevate your lifestyle with uncompromising quality and sophisticated aesthetics.'}
          </p>

          <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0', margin: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 500 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)' }}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span style={{ padding: '0.5rem 1.5rem', fontWeight: 600 }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-color)' }}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
              <span style={{ color: product.stock > 10 ? 'var(--success)' : 'var(--danger)', fontSize: '0.9rem' }}>
                {product.stock} in stock
              </span>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
            >
              {adding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
              <Truck size={20} color="var(--gold-main)" />
              <span>Free Express Shipping on orders over $100</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
              <Shield size={20} color="var(--gold-main)" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
