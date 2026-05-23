import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ArrowLeft, MapPin } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { api } from '../api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items, total, refreshCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const tax = total * 0.08;
  const shipping = total > 100 || total === 0 ? 0 : 15;
  const finalTotal = total + tax + shipping;

  useEffect(() => {
    if (items.length === 0 && !success) {
      navigate('/cart');
    }
  }, [items.length, navigate, success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const order = await api.createOrder(formData);
      setSuccess(order);
      await refreshCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container flex-center flex-column animate-fade-in" style={{ padding: '5rem 1.5rem', minHeight: '60vh', textAlign: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '50%', color: 'var(--success)' }}>
          <Check size={64} />
        </div>
        <h1 style={{ fontSize: '2.5rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Thank you for your purchase. Your order #{success.id} has been placed.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <Link to={`/orders/${success.id}`} className="btn btn-primary">View Order</Link>
          <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <button 
        onClick={() => navigate('/cart')} 
        className="btn btn-ghost" 
        style={{ marginBottom: '2rem', padding: 0 }}
      >
        <ArrowLeft size={20} /> Back to Cart
      </button>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={24} color="var(--gold-main)" /> Shipping Address
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Street Address</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} required placeholder="123 Luxury Ave" />
            </div>
            
            <div className="grid-cols-2">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="New York" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>State / Province</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="NY" />
              </div>
            </div>

            <div className="grid-cols-2">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>ZIP / Postal Code</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} required placeholder="10001" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="USA" />
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payment Method</h3>
              <div style={{ padding: '1rem', border: '1px solid var(--gold-main)', borderRadius: '0.5rem', background: 'rgba(212,165,116,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input type="radio" checked readOnly style={{ width: 'auto' }} />
                <span>Credit Card (Demo - No actual payment required)</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Processing...' : `Place Order • $${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', background: '#fff', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, fontSize: '0.9rem' }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '1rem' }}>
            <span>Total</span>
            <span style={{ color: 'var(--gold-main)' }}>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
