import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { items, total, loading, updateQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const tax = total * 0.08;
  const shipping = total > 100 || total === 0 ? 0 : 15;
  const finalTotal = total + tax + shipping;

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h1>
        <div className="shimmer glass-card" style={{ height: '400px' }}></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container flex-center flex-column" style={{ padding: '5rem 1.5rem', minHeight: '60vh', textAlign: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(212,165,116,0.1)', padding: '2rem', borderRadius: '50%', color: 'var(--gold-main)' }}>
          <ShoppingCart size={64} />
        </div>
        <h2 style={{ fontSize: '2rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center' }}>
              <Link to={`/products/${item.productId}`} style={{ width: '100px', height: '100px', background: '#fff', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Link>
              
              <div style={{ flex: 1 }}>
                <Link to={`/products/${item.productId}`}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                </Link>
                <div style={{ color: 'var(--gold-main)', fontWeight: 600 }}>${item.price.toFixed(2)}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ padding: '0.5rem', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 1rem', fontWeight: 600 }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: '0.5rem', background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-color)' }}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus size={14} />
                </button>
              </div>

              <div style={{ fontWeight: 600, fontSize: '1.1rem', width: '100px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                onClick={() => removeItem(item.id)}
                className="btn-ghost"
                style={{ padding: '0.5rem', color: 'var(--danger)' }}
                title="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <Link to="/products" className="btn btn-ghost" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginBottom: '2rem' }}>
            <span>Total</span>
            <span style={{ color: 'var(--gold-main)' }}>${finalTotal.toFixed(2)}</span>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
