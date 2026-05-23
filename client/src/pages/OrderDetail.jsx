import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin } from 'lucide-react';
import { api } from '../api';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await api.getOrder(id);
        setOrder(data);
      } catch (error) {
        toast.error('Order not found');
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="shimmer glass-card" style={{ height: '500px' }}></div>
      </div>
    );
  }

  if (!order) return null;

  const shippingObj = JSON.parse(order.shippingAddress || '{}');
  const itemsTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = itemsTotal * 0.08;
  const shipping = itemsTotal > 100 ? 0 : 15;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      <button 
        onClick={() => navigate('/orders')} 
        className="btn btn-ghost" 
        style={{ marginBottom: '2rem', padding: 0 }}
      >
        <ArrowLeft size={20} /> Back to Orders
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Order #{order.id}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div style={{ 
          fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase',
          color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)',
          padding: '0.5rem 1rem', borderRadius: '4px',
        }}>
          Status: {order.status}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Items List */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Package size={20} color="var(--gold-main)" /> Order Items
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {order.items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Link to={`/products/${item.productId}`} style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Link>
                
                <div style={{ flex: 1 }}>
                  <Link to={`/products/${item.productId}`}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem', fontWeight: 500 }}>{item.name}</h3>
                  </Link>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Qty: {item.quantity}</div>
                </div>

                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Summary */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Order Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({order.items.reduce((s,i)=>s+i.quantity,0)} items)</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--gold-main)' }}>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="var(--gold-main)" /> Shipping Address
            </h2>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              <p>{shippingObj.street}</p>
              <p>{shippingObj.city}, {shippingObj.state} {shippingObj.zip}</p>
              <p>{shippingObj.country}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetail;
